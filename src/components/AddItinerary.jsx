import React, { useEffect, useRef, useState } from 'react'
import closeBlack from '../assets/closeBlack.png'
import add from '../assets/add.png'
import toast, { Toaster } from 'react-hot-toast'


const AddItinerary = ({ setCreateItinerary }) => {

    const [dataItinerary, setDataItinerary] = useState({
        title: "",
        photo: null,
        price: [],
        duration: undefined,
        hashtag: [],
        activities: []
    })
    const hashtagRef = useRef()

    async function handleCreate(e) {
        e.preventDefault()
        console.log(dataItinerary);
        const keys = Object.keys(dataItinerary)
        const values = Object.values(dataItinerary)
        for (let i = 0; i < keys.length; i++) {
            if (values[i] === null || values[i] === undefined || values[i] === "" || values[i].length < 3) {
                const toastId=toast.error(`Por favor ingrese ${keys[i]}`)
                setTimeout(()=>toast.dismiss(toastId),3500)
            }

        }


    }
    function addHashtag() {
        let hashtagName = hashtagRef.current.value.replaceAll(" ", "")

        if (dataItinerary.hashtag.length < 4) {
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
            console.log("Hay mas de 4");
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

    useEffect(() => {

    }, [dataItinerary])

    return (
        <div className='w-full h-full fixed bg-[#0000003b] top-0 left-0 z-30 flex justify-end'>
            <Toaster position='top-center' 
            toastOptions={{
                success:{duration:1500},
                
            }}/>
            <div className='w-[35vw] relative h-full bg-white flex flex-col items-center px-8 rounded-l-2xl'>
                <button onClick={() => setCreateItinerary(false)} className='absolute top-4 right-4'><img className='w-5' src={closeBlack} alt="" /></button>
                <div className='w-full h-[15vh] flex flex-col items-center justify-center'>
                    <h1 className='text-4xl font-semibold'>From Travelers</h1>
                    <h2 className='text-3xl font-semibold'>For Travelers</h2>
                </div>
                <form onSubmit={(e) => handleCreate(e)} className='w-full h-full flex flex-col justify-evenly'>
                    <div className='w-full '>
                        <p className='font-semibold text-xl'>Title</p>
                        <input onChange={(e) => setDataItinerary({ ...dataItinerary, title: e.target.value })} className='w-full py-1 rounded-lg border border-black px-2' type="text" />
                    </div>
                    <div className='w-full '>
                        <p className='font-semibold text-xl'>Photo</p>
                        <input className='' type="file" />
                        {dataItinerary?.photo !== null && <img className='w-2/6 h-[12vh] bg-black' src="" alt="" />}

                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <p className='font-semibold text-xl'>Price</p>
                        <div className='flex gap-2 items-center'>
                            <select onChange={(e)=>{setDataItinerary({...dataItinerary,price:[e.target.value]});console.log(dataItinerary)}} className='w-2/6 border rounded-lg py-1 border-black' name="" id="">
                                <option value="">Select Price</option>
                                <option value="1">$</option>
                                <option value="2">$$</option>
                                <option value="3">$$$</option>
                                <option value="4">$$$$</option>
                                <option value="4">$$$$$</option>
                            </select>
                            <p>-</p>
                            <select onChange={(e)=>{setDataItinerary({...dataItinerary,price:[...dataItinerary.price,e.target.value]});console.log(dataItinerary)}} className='w-2/6 border rounded-lg py-1 border-black' name="" id="">
                                <option value="">Select Price</option>
                                <option value="1">$</option>
                                <option value="2">$$</option>
                                <option value="3">$$$</option>
                                <option value="4">$$$$</option>
                                <option value="5">$$$$$</option>
                            </select>
                        </div>
                    </div>
                    <div className='w-full'>
                        <p className='font-semibold text-xl'>Duration</p>
                        <input placeholder='min' min={5} max={1440} onChange={(e) => setDataItinerary({ ...dataItinerary, duration: e.target.value })} className='w-2/6 rounded-lg border px-2 py-1 border-black' type="number" />
                    </div>
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
                    <div className='w-full flex items-center justify-center'>
                        <input className='cursor-pointer px-10 py-2 bg-[#2dc77f] rounded-xl text-xl font-semibold text-white' value={"Create And Share"} type="submit" />
                    </div>
                </form>

            </div>
        </div>
    )
}

export default AddItinerary