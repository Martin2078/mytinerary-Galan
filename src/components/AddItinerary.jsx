import React, { useEffect, useRef, useState } from 'react'
import closeBlack from '../assets/closeBlack.png'
import add from '../assets/add.png'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import notActivities from '../assets/notActivities.jpg'
import '../style.css'
import { useSelector } from 'react-redux'


const AddItinerary = ({ setCreateItinerary }) => {
    const { token, user } = useSelector(store => store.profileReducer)
    const [step, setStep] = useState(1)
    const [cities, setCities] = useState([])
    const [activityAdd, setActivityAdd] = useState(false)
    const [activity, setActivity] = useState({
        name: "",
        description: "",
        photo: undefined,
        ubication: ""
    })
    const [dataError, setDataError] = useState({
        title: false,
        photo: false,
        price: false,
        duration: false,
        hashtags: false,
        activities: false,
        cityId: false
    })
    const [activityError, setActivityError] = useState({
        name: false,
        description: false,
        photo: false,
        ubication: false
    })
    const [dataItinerary, setDataItinerary] = useState({
        title: "",
        photo: undefined,
        price: [],
        duration: undefined,
        hashtags: [],
        activities: [],
        cityId: "",
        userId: user._id
    })
    const hashtagRef = useRef()

    async function getCities() {
        let response = await axios.get(`http://localhost:8080/cities`)
        setCities(response.data.response)
    }
    async function createItinerary() {
        setActivityError({
            hashtags: dataItinerary.hashtags.length < 3 ? dataError.hashtags = true : dataError.hashtags = false,
            activities: dataItinerary.activities.length < 3 ? dataError.activities = true : dataError.activities = false,
        })
        if (dataError.hashtags == true || dataError.activities == true) {
            return
        }

        let headers = { headers: { 'Authorization': `Bearer ${token}` } }
        console.log(dataItinerary);
        let response = await axios.post('http://localhost:8080/itineraries', dataItinerary, headers)
        toast.success(response.data.message)
        setTimeout(() => { setCreateItinerary(false) }, 2000)

    }

    function addActivity() {
        console.log(activity);
        setActivityError({
            name: activity.name == "" ? activityError.name = true : activityError.name = false,
            description: activity.description == "" || activity.description.length < 50 ? activityError.description = true : activityError.description = false,
            photo: activity.photo == undefined ? activityError.photo = true : activityError.photo = false,
            ubication: activity.ubication == "" ? activityError.ubication = true : activityError.ubication = false,
        })

        if (activityError.name == true || activityError.description == true || activityError.photo == true || activityError.ubication == true) {
            return
        }

        setDataItinerary({ ...dataItinerary, activities: [...dataItinerary.activities, activity] })
        setActivity({
            name: "",
            description: "",
            photo: undefined,
            ubication: ''
        })
        setActivityAdd(false)
    }

    function nextStep() {
        setDataError({
            title: dataItinerary.title == "" || dataItinerary.title.length < 10 ? dataError.title = true : dataError.title = false,
            photo: dataItinerary.photo == undefined || dataItinerary.photo.length < 1 ? dataError.photo = true : dataError.photo = false,
            cityId: dataItinerary.cityId == "" ? dataError.cityId = true : dataError.cityId = false,
            price: dataItinerary.price.length < 1 ? dataError.price = true : dataError.price = false,
            duration: dataItinerary.duration == undefined || dataItinerary.duration < 5 || dataItinerary.duration.length > 1440 ? dataError.duration = true : dataError.duration = false,
        })
        if (dataError.title == true || dataError.photo == true || dataError.cityId == true || dataError.price == true || dataError.duration == true) {
            return
        }
        setStep(2)
    }


    function addHashtag() {
        let hashtagName = hashtagRef.current.value.replaceAll(" ", "")

        if (dataItinerary.hashtags.length < 8) {
            let startWith = hashtagName.slice(0, 1)
            if (startWith !== "#") {
                hashtagName = "#" + hashtagName
            }
            if (hashtagRef.current.value.length >= 3) {
                setDataItinerary({ ...dataItinerary, hashtags: [...dataItinerary.hashtags, hashtagName] })
                hashtagRef.current.value = ""
            } else {
                toast.error("Please insert text on Hashtag!")
            }
        } else {
            toast.error("8 hashtags is the max!")
        }
    }

    function deleteHashtag(indexHash) {
        setDataItinerary({
            ...dataItinerary, hashtags: [...dataItinerary.hashtags.filter((hash, index) => {
                if (index !== indexHash) {
                    return hash
                }
            })]
        })
    }
    function deleteActivity(indexActivity) {
        setDataItinerary({
            ...dataItinerary, activities: [...dataItinerary.activities.filter((act, index) => {
                if (index !== indexActivity) {
                    return act
                }
            })]
        })
    }
    function getPhoto(e) {
        let url = URL.createObjectURL(e.target.files[0])
        setDataItinerary({ ...dataItinerary, photo: url })
    }

    function setPrice(value, position) {
        dataItinerary.price[position] = value
    }

    useEffect(() => {
        getCities()
    }, [])

    return (
        <div className='w-full h-full fixed bg-[#0000003b] top-0 left-0 z-30 flex justify-end'>
            <Toaster position='top-center'
                toastOptions={{
                    success: { duration: 1500 },

                }} />
            <div className='w-[35vw] animationMyItinerary relative h-full z-40 bg-white flex flex-col items-center gap-5 px-8 rounded-l-2xl'>
                <button onClick={() => setCreateItinerary(false)} className='absolute top-4 right-4'><img className='w-5' src={closeBlack} alt="" /></button>
                <div className='w-full h-[15vh] flex flex-col items-center justify-center border-b'>
                    <h1 className='text-4xl font-semibold'>From Travelers</h1>
                    <h2 className='text-3xl font-semibold'>For Travelers</h2>
                </div>
                {step == 1 ?
                    <>
                        <div className='w-full h-5/6 flex flex-col justify-start gap-4'>
                            <div className='w-full flex flex-col gap-2'>
                                <div className='flex flex-col'>
                                    <p className='font-semibold text-xl'>Title</p>
                                    <p className={`text-sm text-red-600 opacity-0 ${dataError.title && "opacity-100"}`}>* Obligatory Field (min 10 characters)</p>
                                </div>
                                <input placeholder='Tell travelers about your itinerary...' onChange={(e) => setDataItinerary({ ...dataItinerary, title: e.target.value })} className={`w-full py-1 rounded-lg border ${dataError.title ? "border-red-600" : "border-black"} px-2`} type="text" />
                            </div>
                            <div className='w-full flex flex-col gap-2 '>
                                <div className='flex flex-col'>
                                    <p className='font-semibold text-xl'>Photo</p>
                                    <p className={`text-sm text-red-600 opacity-0 ${dataError.photo && "opacity-100"}`}>* Obligatory Field</p>
                                </div>
                                <input onChange={(e) => setDataItinerary({ ...dataItinerary, photo: e.target.value })} className={`w-full py-1 rounded-lg border ${dataError.photo ? "border-red-600" : "border-black"} px-2`} type="url" />
                                {dataItinerary?.photo !== undefined && <img className='w-2/6 h-[12vh] rounded-xl' src={dataItinerary.photo} alt="" />}

                            </div>
                            <div className='w-full flex flex-col gap-2'>
                                <div className='flex flex-col'>
                                    <p className='font-semibold text-xl'>City</p>
                                    <p className={`text-sm text-red-600 opacity-0 ${dataError.cityId && "opacity-100"}`}>* Select a city</p>
                                </div>
                                <select onChange={e => setDataItinerary({ ...dataItinerary, cityId: e.target.value })} name="" id="" className={`w-4/6 border rounded-lg py-1 ${dataError.cityId ? "border-red-600" : "border-black"}`}>
                                    <option value="">Select City</option>
                                    {cities?.map((city) => {
                                        return <option value={city?._id}>{city?.cityName}</option>
                                    })}
                                </select>
                            </div>
                            <div className='w-full flex flex-col gap-2'>
                                <div className='flex flex-col'>
                                    <p className='font-semibold text-xl'>Price</p>
                                    <p className={`text-sm text-red-600 opacity-0 ${dataError.price && "opacity-100"}`}>* Obligatory Field</p>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <select onChange={(e) => { setPrice(e.target.value, 0) }} className={`w-2/6 border rounded-lg py-1 ${dataError.price ? "border-red-600" : "border-black"}`} name="" id="">
                                        <option value="">Select Price</option>
                                        <option value="1">$</option>
                                        <option value="2">$$</option>
                                        <option value="3">$$$</option>
                                        <option value="4">$$$$</option>
                                        <option value="4">$$$$$</option>
                                    </select>
                                    <p>-</p>
                                    <select onChange={(e) => { setPrice(e.target.value, 1) }} className={`w-2/6 border rounded-lg py-1 ${dataError.price ? "border-red-600" : "border-black"}`} name="" id="">
                                        <option value="">Select Price</option>
                                        <option value="1">$</option>
                                        <option value="2">$$</option>
                                        <option value="3">$$$</option>
                                        <option value="4">$$$$</option>
                                        <option value="5">$$$$$</option>
                                    </select>
                                </div>
                            </div>
                            <div className='w-full flex flex-col gap-2'>
                                <div className='flex flex-col'>
                                    <p className='font-semibold text-xl'>Duration</p>
                                    <p className={`text-sm text-red-600 opacity-0 ${dataError.duration && "opacity-100"}`}>* Obligatory Field (between 5 and 1440 minutes)</p>
                                </div>
                                <input placeholder='minutes' min={5} max={1440} onChange={(e) => setDataItinerary({ ...dataItinerary, duration: e.target.value })} className={`w-2/6 rounded-lg border px-2 py-1 ${dataError.duration ? "border-red-600" : "border-black"}`} type="number" />
                            </div>
                        </div>
                        <div className='w-full flex items-center justify-center mb-12'>
                            <button className='cursor-pointer px-10 py-2 bg-[#2dc77f] rounded-xl text-xl font-semibold text-white' onClick={() => nextStep()}>
                                Continue
                            </button>
                        </div>
                    </>
                    :
                    activityAdd ?
                        <div className='w-[35vw] animationMyItinerary relative h-screen bg-white flex flex-col items-center gap-5 px-8 rounded-l-2xl'>
                            <div className='w-full h-[15vh] flex flex-col items-center justify-center border-b'>
                                <h1 className='text-4xl font-semibold'>Activity</h1>
                            </div>
                            <div className='w-full h-full flex flex-col justify-start gap-12'>
                                <div className='w-full flex flex-col gap-2 '>
                                    <div className='flex items-center justify-between'>
                                        <p className='font-semibold text-xl'>Name</p>
                                        <p className={`text-sm text-red-600 opacity-0 ${activityError.name && "opacity-100"}`}>* Obligatory field</p>
                                    </div>
                                    <input onChange={(e) => setActivity({ ...activity, name: e.target.value })} className={`w-full py-1 rounded-lg border ${activityError.name ? "border-red-600" : "border-black"} px-2`} type="text" />
                                </div>

                                <div className='w-full flex flex-col gap-2 '>
                                    <div className='flex items-center justify-between'>
                                        <p className='font-semibold text-xl'>Photo</p>
                                        <p className={`text-sm text-red-600 opacity-0 ${activityError.photo && "opacity-100"}`}>* Obligatory field</p>
                                    </div>
                                    <input className={`w-full py-1 rounded-lg border ${activityError.photo ? "border-red-600" : "border-black"} px-2`} type="url" onChange={(e) => setActivity({ ...activity, photo: e.target.value })} />
                                </div>

                                <div className='w-full flex flex-col gap-2 '>
                                    <div className='flex items-center justify-between'>
                                    <p className='font-semibold text-xl'>Description</p>
                                    <p className={`text-sm text-red-600 opacity-0 ${activityError.description && "opacity-100"}`}>* Obligatory field (minimum 50 characters)</p>
                                    </div>
                                    <textarea  placeholder='Describe this activity...' onChange={(e) => setActivity({ ...activity, description: e.target.value })} className={`w-full h-[15vh] py-1 rounded-lg border ${activityError.description ? "border-red-600" : "border-black"} px-2 text-left resize-none`} type="text"></textarea>
                                </div>

                                <div className='w-full flex flex-col gap-2 '>
                                    <div className='flex items-center justify-between'>
                                    <p className='font-semibold text-xl'>Ubication</p>
                                    <p className={`text-sm text-red-600 opacity-0 ${activityError.ubication && "opacity-100"}`}>* Obligatory field</p>
                                    </div>
                                    <input onChange={(e) => setActivity({ ...activity, ubication: e.target.value })} className={`w-full py-1 rounded-lg border ${activityError.ubication ? "border-red-600" : "border-black"} px-2 text-left`} type="text" />
                                </div>
                            </div>
                            <div className='w-full flex items-center justify-center mb-12 gap-4'>
                                <button className='cursor-pointer px-10 py-2 bg-[#b92525] rounded-xl text-xl font-semibold text-white' onClick={() => { setActivity({ name: "", description: "", photo: [], ubication: "" }); setActivityAdd(false) }}>
                                    Cancel
                                </button>
                                <button className='cursor-pointer px-10 py-2 bg-[#2dc77f] rounded-xl text-xl font-semibold text-white' onClick={() => addActivity()}>
                                    Add activity
                                </button>
                            </div>
                        </div>
                        :
                        <><div className='w-full h-5/6 flex flex-col justify-start gap-12'>
                            <div className='w-full min-h-[10vh] flex flex-col gap-2 '>
                                <div className='flex flex-col'>
                                    <p className='font-semibold text-xl'>Hashtags</p>
                                    <p className={`text-sm text-red-600 ${dataError.hashtags ? "block" : "hidden"}`}>* Obligatory Field (minimum 3)</p>
                                </div>
                                {dataItinerary?.hashtags.length > 0 && <div className='w-full min-h-[4vh] flex flex-wrap gap-x-4 gap-y-2'>
                                    {dataItinerary.hashtags.map((hash, index) => {
                                        return <div className='flex items-center gap-2 border rounded-xl px-2 h-fit py-1'>
                                            <p className='font-medium'>{hash}</p>
                                            <button onClick={() => deleteHashtag(index)}><img className='w-2' src={closeBlack} alt="" /></button>
                                        </div>
                                    })}
                                </div>}
                                <div className='w-full rounded-lg flex items-center justify-between'>
                                    <input ref={hashtagRef} className=' w-4/5 py-1 px-2 rounded-lg outline-none border border-black' maxLength={15} type="text" />
                                    <button onClick={() => addHashtag()} className='flex items-center px-2 gap-1 bg-[#2dc77f] rounded-xl '><img className='w-3' src={add} alt="" /><p className='text-white'>Add</p></button>
                                </div>
                            </div>
                            <div className='w-full max-h-[45vh] flex flex-col gap-4'>
                                <div>
                                    <div className='w-full flex items-center justify-between py-1'>
                                        <p className='font-semibold text-xl'>Activities</p>
                                        <button onClick={() => setActivityAdd(true)} className='flex items-center px-2 gap-1 bg-[#2dc77f] rounded-xl '><img className='w-3' src={add} alt="" /><p className='text-white'>new</p></button>
                                    </div>
                                    <p className={`text-sm text-red-600 ${dataError.activities ? "block" : "hidden"}`}>* Obligatory Field (minimum 3)</p>
                                </div>
                                {dataItinerary?.activities.length > 0 ?
                                    <div className='overflow-y-auto h-full w-full flex flex-col gap-2 px-4'>
                                        {dataItinerary.activities.map((acti, index) => {
                                            return <div className='w-full h-[10vh] border flex items-start relative rounded-xl'>
                                                <img className='w-1/2 h-full object-cover rounded-xl' src={acti.photo} alt="" />
                                                <div className='w-1/2  h-full px-2 py-1 overflow-hidden'>
                                                    <p className='font-semibold text-lg'>{acti.name.slice(0, 30)}</p>
                                                </div>
                                                <button onClick={() => deleteActivity(index)}><img className='w-2 absolute top-2 right-2' src={closeBlack} alt="" /></button>
                                            </div>
                                        })}
                                    </div>

                                    :
                                    <div className='flex flex-col w-full h-[35vh] items-center rounded-lg'>
                                        <img className='w-full h-4/6 object-cover rounded-lg' src={notActivities} alt="" />
                                        <p className='text-xl font-semibold'>There is no activies on this itinerary!</p>
                                        <p className='text-lg font-semibold'>please insert almost 3</p>
                                    </div>
                                }
                            </div>
                        </div>
                            <div className='w-full flex items-center justify-center mb-12'>
                                <button className='cursor-pointer px-10 py-2 bg-[#2dc77f] rounded-xl text-xl font-semibold text-white' onClick={() => createItinerary()}>
                                    Create and Share!
                                </button>
                            </div>
                        </>}


            </div>
        </div>
    )
}

export default AddItinerary