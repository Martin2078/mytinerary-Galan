import React, { useEffect, useRef, useState } from 'react'
import closeBlack from '../assets/closeBlack.png'
import add from '../assets/add.png'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'


const AddItinerary = ({ setCreateItinerary }) => {

    const [step, setStep] = useState(1)
    const [cities, setCities] = useState([])
    const [dataItinerary, setDataItinerary] = useState({
        title: "",
        photo: undefined,
        price: [],
        duration: undefined,
        hashtag: [],
        activities: [],
        city: ""
    })
    const hashtagRef = useRef()

    async function getCities() {
        let response = await axios.get(`http://localhost:8080/cities`)
        setCities(response.data.response)
    }
    async function createItinerary() {
        console.log(dataItinerary);
        if (dataItinerary.hashtag.length < 1) {
            toast.error("Please insert almost 3 hashtags!")
        }
        if (dataItinerary.activities.length < 1) {
            toast.error("Please insert almost 3 activities!")
            return
        }
    }

    function nextStep() {
        console.log(dataItinerary);
        if (dataItinerary.title == "") {
            toast.error("Please insert title!")
        }
        if (dataItinerary.photo == undefined) {
            toast.error("Please insert photo!")
        }
        if (dataItinerary.city == "") {
            toast.error("Please select city!")
        }
        if (dataItinerary.price.length < 1) {
            toast.error("Please Insert price!")
        }
        if (dataItinerary.duration == undefined) {
            toast.error("Please Insert duration!")
        }

    }


    function addHashtag() {
        let hashtagName = hashtagRef.current.value.replaceAll(" ", "")

        if (dataItinerary.hashtag.length < 8) {
            let startWith = hashtagName.slice(0, 1)
            if (startWith !== "#") {
                hashtagName = "#" + hashtagName
            }
            if (hashtagRef.current.value.length >= 3) {
                setDataItinerary({ ...dataItinerary, hashtag: [...dataItinerary.hashtag, hashtagName] })
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
            ...dataItinerary, hashtag: [...dataItinerary.hashtag.filter((hash, index) => {
                if (index !== indexHash) {
                    return hash
                }
            })]
        })
    }
    function getPhoto(e) {
    let url=URL.createObjectURL(e.target.files[0])
    setDataItinerary({...dataItinerary,photo:url})  
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
            <div className='w-[35vw] relative h-full bg-white flex flex-col items-center px-8 rounded-l-2xl'>
                <button onClick={() => setCreateItinerary(false)} className='absolute top-4 right-4'><img className='w-5' src={closeBlack} alt="" /></button>
                <div className='w-full h-[15vh] flex flex-col items-center justify-center'>
                    <h1 className='text-4xl font-semibold'>From Travelers</h1>
                    <h2 className='text-3xl font-semibold'>For Travelers</h2>
                </div>
                {step == 1 ? 
                <>
                <div className='w-full h-5/6 flex flex-col justify-evenly'>
                    <div className='w-full '>
                        <p className='font-semibold text-xl'>Title</p>
                        <input onChange={(e) => setDataItinerary({ ...dataItinerary, title: e.target.value })} className='w-full py-1 rounded-lg border border-black px-2' type="text" />
                    </div>
                    <div className='w-full '>
                        <p className='font-semibold text-xl'>Photo</p>
                        <input onChange={(e)=>getPhoto(e)} className='' type="file" />
                        {dataItinerary?.photo !== undefined && <img className='w-2/6 h-[12vh]' src={dataItinerary.photo} alt="" />}

                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <p className='font-semibold text-xl'>City</p>
                        <select onChange={e=>setDataItinerary({...dataItinerary,city:e.target.value})} name="" id="" className='w-3/6 border rounded-lg py-1 border-black'>
                            <option value="">Select City</option>
                            {cities?.map((city)=>{
                                return <option value={city?.cityName}>{city?.cityName}</option>
                            })}
                        </select>
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <p className='font-semibold text-xl'>Price</p>
                        <div className='flex gap-2 items-center'>
                            <select onChange={(e) => { setPrice(e.target.value, 0) }} className='w-2/6 border rounded-lg py-1 border-black' name="" id="">
                                <option value="">Select Price</option>
                                <option value="1">$</option>
                                <option value="2">$$</option>
                                <option value="3">$$$</option>
                                <option value="4">$$$$</option>
                                <option value="4">$$$$$</option>
                            </select>
                            <p>-</p>
                            <select onChange={(e) => { setPrice(e.target.value, 1) }} className='w-2/6 border rounded-lg py-1 border-black' name="" id="">
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
                        <p className='font-semibold text-xl'>Duration</p>
                        <input placeholder='min' min={5} max={1440} onChange={(e) => setDataItinerary({ ...dataItinerary, duration: e.target.value })} className='w-2/6 rounded-lg border px-2 py-1 border-black' type="number" />
                    </div>
                </div>
                <div className='w-full flex items-center justify-center mb-12'>
                <button className='cursor-pointer px-10 py-2 bg-[#2dc77f] rounded-xl text-xl font-semibold text-white' onClick={() => nextStep()}>
                    Continue
                </button>
            </div>
            </>
                    :
                    <><div className='w-full h-5/6 flex flex-col justify-start gap-20'>
                        <div className='w-full flex flex-col gap-2 '>
                            <p className='font-semibold text-xl'>Hashtag</p>
                            {dataItinerary?.hashtag.length > 0 && <div className='w-full min-h-[4vh] flex flex-wrap gap-x-4 gap-y-2'>
                                {dataItinerary.hashtag.map((hash, index) => {
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
                        <div className='w-full min-h-[10vh]'>
                            <div className='w-full flex items-center justify-between py-1'>
                                <p className='font-semibold text-xl'>Activities</p>
                                <button className='flex items-center px-2 gap-1 bg-[#2dc77f] rounded-xl '><img className='w-3' src={add} alt="" /><p className='text-white'>Add</p></button>
                            </div>
                            {dataItinerary?.activities.length > 0 && <div className='w-full h-[10vh] flex items-center'>

                            </div>}
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