import React, { useEffect, useRef, useState } from 'react'
import closeBlack from '../assets/closeBlack.png'
import add from '../assets/add.png'
import toast, { Toaster } from 'react-hot-toast'
import notActivities from '../assets/notActivities.jpg'
import '../style.css'
import { useDispatch, useSelector } from 'react-redux'
import citiesAction from '../redux/actions/citiesAction.js'
import ItineraryForm from './ItineraryForm.jsx'
import ActivityForm from './ActivityForm.jsx'


const AddItinerary = ({ setCreateItinerary }) => {
    const { token, user } = useSelector(store => store.profileReducer)
    const [step, setStep] = useState(1)
    const [cities, setCities] = useState([])
    const [activityAdd, setActivityAdd] = useState(false)
    const citiesStore = useSelector(store => store.citiesReducer)
    const dispatch = useDispatch()
    const [activityPhotos,setActivityPhotos]=useState([])


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
    const [dataError, setDataError] = useState({
        title: false,
        photo: false,
        price: false,
        duration: false,
        hashtags: false,
        activities: false,
        cityId: false
    })
    const hashtagRef = useRef()

    
    async function createItinerary() {
        setDataError({
            hashtags: dataItinerary.hashtags.length < 3 ? dataError.hashtags = true : dataError.hashtags = false,
            activities: dataItinerary.activities.length < 3 ? dataError.activities = true : dataError.activities = false,
        })
        if (dataError.hashtags == true || dataError.activities == true) {
            return
        }
        console.log(dataItinerary);
        // let headers = { headers: { 'Authorization': `Bearer ${token}` } }
        // console.log(dataItinerary);
        // let response = await axios.post('http://localhost:8080/itineraries', dataItinerary, headers)
        // toast.success(response.data.message)
        // setTimeout(() => { setCreateItinerary(false) }, 2000)

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


    


    useEffect(() => {
        if (citiesStore.cities == null) {
            dispatch(citiesAction())
        } else {
            setCities(citiesStore.cities)
        }
    }, [citiesStore])





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
                        <ItineraryForm setDataError={setDataError} dataError={dataError} dataItinerary={dataItinerary} cities={cities} setDataItinerary={setDataItinerary} setStep={setStep}/>
                    </>
                    :
                    activityAdd ?
                        <ActivityForm activityPhotos={activityPhotos} setActivityPhotos={setActivityPhotos} dataItinerary={dataItinerary} setActivityAdd={setActivityAdd} setDataItinerary={setDataItinerary} />
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
                                {activityPhotos?.length > 0 ?
                                    <div className='overflow-y-auto h-full w-full flex flex-col gap-2 px-4'>
                                        {dataItinerary.activities.map((acti, index) => {
                                            return <div className='w-full h-[10vh] border flex items-start relative rounded-xl'>
                                                <img className='w-1/2 h-full object-cover rounded-xl' src={activityPhotos[index][0]} alt="" />
                                                <div className='w-1/2  h-full px-2 py-1 overflow-hidden'>
                                                    <p className='font-semibold text-lg'>{acti.name.slice(0, 30)}</p>
                                                </div>
                                                <button onClick={() => deleteActivity(index)}><img className='w-2 absolute top-2 right-2' src={closeBlack} alt="" /></button>
                                            </div>
                                        })}
                                    </div>

                                    :
                                    <div className='flex flex-col w-full h-[35vh] items-center rounded-lg'>
                                        <img className='w-full h-4/6 object-cover rounded-lg'  src={notActivities} alt="" />
                                        <p className='text-xl font-semibold text-center'>There is no activies on this itinerary!</p>
                                        <p className='text-lg font-semibold text-center'>please insert almost 3</p>
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