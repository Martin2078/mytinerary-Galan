import React, { useEffect, useRef, useState } from 'react'
import closeBlack from '../assets/closeBlack.png'
import add from '../assets/add.png'
import axios from 'axios'
import _ from 'lodash'
import isEqual from 'lodash/isEqual'
import { useDispatch, useSelector } from 'react-redux'
import citiesAction from '../redux/actions/citiesAction'


const EditItinerary = ({ itineraryInfo, setEdit, toast, token }) => {
    const [urlPhotos,setUrlPhotos]=useState({})
    const dispatch=useDispatch()
    const citiesStore=useSelector(store=>store.citiesReducer)
    const [cities,setCities]=useState([])
    const [changes, setChanges] = useState({})
    const hashtagRef = useRef()
    const [changesError, setChangesError] = useState({
        title: false,
        duration: false,
        price: false,
        hashtags: false,
        cityId:false
    })
    function exitConfirmation() {
        let changeOnActivities = false
        if (changes.activities.length !== itineraryInfo.activities.length) {
            changeOnActivities = true
        } else {
            let equals = changes.activities.map((activity, index) => {
                if (isEqual(activity, itineraryInfo.activities[index])) {
                    return true
                } else {
                    return false
                }
            })

            if (equals.some((equal) => equal === false)) {
                changeOnActivities = true

            }
        }

        if (changeOnActivities || changes.price || changes.photo || changes.title || changes.duration || !changes.hashtags.every((value, index) => value === itineraryInfo.hashtags[index])) {
            toast.custom((t) => (
                <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} px-5 py-2 text-center max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 flex-col items-center gap-2`}>
                    <div className='w-full'>
                        <p className='text-2xl font-semibold'>There are unsaved changes</p>
                        <p className='text-xl'>Are you sure you want to exit without saving?</p>
                    </div>
                    <div className='w-full h-[5vh] flex justify-evenly'>
                        <button onClick={() => toast.dismiss(t.id)} className='w-1/3 h-full border rounded-lg bg-red-600'><p className='text-white font-semibold text-xl'>No</p></button>
                        <button onClick={() => { toast.dismiss(t.id); setEdit(false) }} className='w-1/3 h-full border rounded-lg bg-[#2dc77f]'><p className='text-white font-semibold text-xl'>Yes</p></button>
                    </div>
                </div>
            ))
        } else {
            setEdit(false)
        }
    }

    async function editFunction() {
        setChangesError({
            title: changes.title && changes.title.length < 4 ? changesError.title = true : changesError.title = false,
            duration: changes.duration && changes.duration < 5 || changes.duration > 1440 ? changesError.duration = true : changesError.duration = false,
            price: changes.price && changes.price.length < 1 ? changesError.price = true : changesError.price = false,
            hashtags: changes.hashtags?.length < 3 ? changesError.hashtags = true : changesError.hashtags = false,
        })
        if (changesError.title === true || changesError.duration === true || changesError.price === true || changesError.hashtags === true) {
            return
        }
        const formData=new FormData()
        if (changes.title) {
            formData.append('title',changes.title)
        }
        if (changes.price) {
            for (let i = 0; i< changes.price.length; i++) {
                formData.append('price',changes.price[i])
            }
        }
        if (changes.hashtags) {
            for (let i = 0; i< changes.hashtags.length; i++) {
                formData.append('hashtags',changes.hashtags[i])
            }
        }
        if (changes.duration) {
            formData.append('duration',changes.duration)
        }
        if (changes.photo) {
            formData.append('photo',changes.photo)
        }
        if (changes.cityId) {
            formData.append('cityId',changes.cityId)
        }
        if (changes.activities) {
            changes.activities.map((activity,index)=>{
                formData.append(`activity${index}name`,activity.name)
                formData.append(`activity${index}description`,activity.description)
                activity.photo.forEach((photo) => {
                    formData.append(`activity${index}photo`,photo)
                });
                formData.append(`activity${index}ubication`,activity.ubication)
            })
        }

        let headers = { headers: { 'Authorization': `Bearer ${token}` } }
        let response = axios.put(`http://localhost:8080/itineraries/${itineraryInfo._id}`, formData, headers)
        toast.promise(response, {
            loading: 'making changes',
            success: (data) => data.data.message,
            error: (data) => data.response.data.error
        });
        response.then(() => {
            setTimeout(() => {
                setEdit(false)
            }, 1500);
        })
    }

    function changeActivity(e, index, property) {
        let newActivity = changes.activities
        newActivity[index][property] = e.target.value
        setChanges({ ...changes, activities: newActivity })

    }

    function changePrice(e, position) {
        let newPrice = itineraryInfo.price
        newPrice[position] = e.target.value

        if (e.target.value == '') {
            newPrice = newPrice.filter((val, index) => {
                if (index !== position) {
                    return val
                }
            })

            setChanges({ ...changes, price: newPrice })
            return
        }
        setChanges({ ...changes, price: newPrice })
    }

    function addHashtag() {
        let hashtagName = hashtagRef.current.value.replaceAll(" ", "")

        if (changes.hashtags.length < 8) {
            let startWith = hashtagName.slice(0, 1)
            if (startWith !== "#") {
                hashtagName = "#" + hashtagName
            }
            if (hashtagName.length >= 3) {
                setChanges({ ...changes, hashtags: [...changes.hashtags, hashtagName] })
                hashtagRef.current.value = ""
            } else {
                toast.error("Please insert text on Hashtag (min 3 characters)!")
            }
        } else {
            toast.error("8 hashtags is the maximum!")
        }
    }

    function deleteHashtag(indexHash) {
        setChanges({
            ...changes, hashtags: [...changes.hashtags.filter((hash, index) => {
                if (index !== indexHash) {
                    return hash
                }
            })]
        })
    }
    function getPhoto(e) {
        let img=e.target.files[0]
        let url = URL.createObjectURL(e.target.files[0])
        setUrlPhotos({photoItinerary:url})
        setChanges({...changes,photo:img})
    }

    useEffect(() => {
        let itineraryClone = _.cloneDeep(itineraryInfo)
        setChanges({ ...changes, hashtags: itineraryClone.hashtags, activities: itineraryClone.activities })
        setChangesError({ ...changesError, activities: [itineraryClone.activities.map((activity) => { return false })] })
    }, [])

    useEffect(() => {
        if (citiesStore.cities == null) {
            dispatch(citiesAction())
        } else {
            setCities(citiesStore.cities)
        }
    }, [citiesStore])

    return (
        <div className='fixed bg-[#0000003b] top-0 left-0 z-30 w-screen h-screen flex items-center justify-center'>

            <div className='w-full h-full lg:w-[90vw] xl:w-[75vw] lg:h-[95vh] bg-white rounded-xl relative flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden'>
                <div className='w-full lg:w-2/3 lg:h-full  border-r px-2 py-2 pb-auto pb-10 md:pb-0'>
                    <div className='w-full h-2/5 relative'>
                        <img className='w-full h-full object-cover rounded-xl' src={urlPhotos.photoItinerary? urlPhotos.photoItinerary : itineraryInfo.photo} alt="" />
                        <div className='w-full h-full rounded-xl flex items-center justify-center absolute top-0 left-0 bg-[#0000003b] opacity-0 hover:opacity-100'>
                            <input onChange={e=>getPhoto(e)} className='w-full h-full opacity-0' type="file" />
                            <p className='text-white text-3xl absolute font-semibold'>Change Photo</p>
                        </div>
                    </div>
                    <div className='w-full h-3/5 relative '>

                        <div className='w-full h-[6vh] flex justify-end py-2 gap-2'>
                            <button onClick={() => exitConfirmation()} className='w-3/12 rounded-xl bg-red-600 text-white font-semibold text-xl'>Cancel</button>
                            <button onClick={() => editFunction()} className='w-3/12 rounded-xl bg-[#2dc77f] text-white font-semibold text-xl'>Edit</button>
                        </div>

                        <div className='flex flex-col gap-4 lg:gap-2 xl:gap-4'>

                            <div className='flex flex-col'>
                                <div className='w-10/12 flex justify-between items-center'>
                                    <label className='text-xl font-semibold'>Title</label>
                                    <p className={`lg:text-sm text-xs text-red-600 opacity-0 ${changesError.title && "opacity-100"}`}>* Obligatory field (min 3 characters)</p>
                                </div>
                                <input type="text" onChange={(e) => setChanges({ ...changes, title: e.target.value })} defaultValue={itineraryInfo.title} className={`border ${changesError.title ? "border-red-600" : "border-black"} rounded-lg w-10/12 px-2 py-1`} />
                            </div>

                            <div className='flex flex-col'>
                                <div className='w-10/12 flex items-center justify-between'>
                                    <label className='text-xl font-semibold'>Duration</label>
                                    <p className={`lg:text-sm text-xs text-red-600 opacity-0 ${changesError.duration && "opacity-100"}`}>* Obligatory field (min 5 and max 1440 minutes)</p>
                                </div>
                                <input type="number" onChange={(e) => setChanges({ ...changes, duration: e.target.value })} defaultValue={itineraryInfo.duration} className={`border ${changesError.duration ? "border-red-600" : "border-black"} rounded-lg px-2 py-1 w-1/4`} />
                            </div>

                            <div className='flex flex-col'>
                                <div className='w-10/12 flex items-center justify-between'>
                                    <label className='text-xl font-semibold'>Price</label>
                                    <p className={`lg:text-sm text-xs text-red-600 opacity-0 ${changesError.price && "opacity-100"}`}>* Obligatory field</p>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <select onChange={(e) => changePrice(e, 0)} defaultValue={itineraryInfo.price[0]} className={`w-2/5 lg:w-2/6 border rounded-lg py-1 ${changesError.price ? "border-red-600" : "border-black"}`} name="" id="">
                                        <option value="">Select Price</option>
                                        <option value="1">$</option>
                                        <option value="2">$$</option>
                                        <option value="3">$$$</option>
                                        <option value="4">$$$$</option>
                                        <option value="4">$$$$$</option>
                                    </select>
                                    <p>-</p>
                                    <select onChange={(e) => changePrice(e, 1)} defaultValue={itineraryInfo.price[1]} className={`w-2/5 lg:w-2/6 border rounded-lg py-1 ${changesError.price ? "border-red-600" : "border-black"} `} name="" id="">
                                        <option value="">Select Price</option>
                                        <option value="1">$</option>
                                        <option value="2">$$</option>
                                        <option value="3">$$$</option>
                                        <option value="4">$$$$</option>
                                        <option value="5">$$$$$</option>
                                    </select>
                                </div>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <div className='w-10/12 flex items-center justify-between'>
                                    <p className='text-xl font-semibold'>Hashtags</p>
                                    <p className={`lg:text-sm text-xs text-red-600 opacity-0 ${changesError.hashtags && "opacity-100"}`}>* Obligatory field (min 3 hashtags)</p>
                                </div>
                                {changes.hashtags?.length > 0 && <div className='w-full min-h-[4vh] max-h-[6vh]   overflow-y-auto flex flex-wrap gap-x-4 gap-y-2'>
                                    {changes.hashtags?.map((hash, index) => {
                                        return <div className='flex items-center gap-2 border rounded-xl px-2 h-fit py-1'>
                                            <p className='font-medium'>{hash}</p>
                                            <button onClick={() => deleteHashtag(index)}><img className='w-2' src={closeBlack} alt="" /></button>
                                        </div>
                                    })}
                                </div>}
                                <div className='w-full rounded-lg flex items-center justify-between'>
                                    <input ref={hashtagRef} className={`w-4/6 lg:w-10/12 py-1 px-2 rounded-lg outline-none border ${changesError.hashtags ? "border-red-600" : "border-black"}`} maxLength={15} type="text" />
                                    <button onClick={() => addHashtag()} className='flex items-center px-2 gap-1 bg-[#2dc77f] rounded-xl '><img className='w-3' src={add} alt="" /><p className='text-white'>Add</p></button>
                                </div>
                            </div>
                            <div className='w-full flex flex-col gap-1'>
                                <div className='flex'>
                                    <p className='font-semibold text-xl'>City</p>
                                    <p className={`text-sm text-red-600 opacity-0 ${changesError.cityId && "opacity-100"}`}>* Select a city</p>
                                </div>
                                <select onChange={e => setChanges({ ...changes, cityId: e.target.value })} name="selectedCity" id="" className={`w-4/6 border rounded-lg py-1 ${changesError.cityId ? "border-red-600" : "border-black"}`}>
                                    <option value={itineraryInfo.cityId._id}>{itineraryInfo.cityId.cityName}</option>
                                    {cities?.map((city) => {
                                        if (city._id !== itineraryInfo.cityId._id) {
                                            return <option value={city?._id}>{city?.cityName}</option> 
                                        }
                                    })}
                                </select>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='w-full lg:w-1/3 h-full  lg:overflow-y-auto px-2'>
                    {changes.activities?.map((activity, index) => {
                        return <div className='w-full flex flex-col items-center gap-2 border-b py-8'>
                            <h2 className='text-xl font-semibold'>Activity {index + 1}</h2>
                            <div className='w-full h-[15vh] lg:h-[12vh] overflow-x-auto px-2 flex gap-4 '>
                                {activity.photo.map((img) => {
                                    return <div className='min-w-[50vw] md:min-w-[30vw] lg:min-w-[10vw] h-full'>
                                        <img className='h-full w-full object-cover rounded-xl' src={img} alt="" />
                                    </div>
                                })}
                            </div>
                            <div className='flex flex-col w-11/12 gap-2'>
                                <label className='text-xl font-semibold'>Name</label>
                                <input onChange={(e) => changeActivity(e, index, 'name')} type="text" defaultValue={activity.name} className='border px-2 py-1 rounded-lg' />
                            </div>
                            <div className='flex flex-col w-11/12 gap-2'>
                                <label className='text-xl font-semibold'>Description</label>
                                <textarea onChange={(e) => changeActivity(e, index, 'description')} type="text" defaultValue={activity.description} className='resize-none rounded-lg border w-full px-2 py-1 h-[15vh]' />
                            </div>
                            <div className='flex flex-col w-11/12 gap-2'>
                                <label className='text-xl font-semibold'>Ubication</label>
                                <input onChange={(e) => changeActivity(e, index, 'ubication')} type="text" defaultValue={activity.ubication} className='border px-2 py-1 rounded-lg' />
                            </div>
                        </div>
                    })}

                </div>
            </div>
        </div>
    )
}

export default EditItinerary