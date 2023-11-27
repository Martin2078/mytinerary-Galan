import React, { useState } from 'react'
import notPhotos from '../assets/notPhotos.png'

const ItineraryForm = ({ dataItinerary, setDataItinerary, cities, setStep, dataError, setDataError }) => {
    const [photoItinerary, setPhotoItinerary] = useState(undefined)

    function getPhoto(e) {
        let url = URL.createObjectURL(e.target.files[0])
        setPhotoItinerary(url)
        setDataItinerary({...dataItinerary,photo:e.target.files[0]})
    }

    function setPrice(value, position) {
        dataItinerary.price[position] = value
    }
    function nextStep() {
       
        setDataError({
            title: dataItinerary.title == "" || dataItinerary.title.length < 10 ? dataError.title = true : dataError.title = false,
            photo: photoItinerary == null ? dataError.photo = true : dataError.photo = false,
            cityId: dataItinerary.cityId == "" ? dataError.cityId = true : dataError.cityId = false,
            price: dataItinerary.price.length < 1 ? dataError.price = true : dataError.price = false,
            duration: dataItinerary.duration == undefined || dataItinerary.duration < 5 || dataItinerary.duration > 1440 ? dataError.duration = true : dataError.duration = false,
        })
        if (dataError.title == true || dataError.photo == true || dataError.cityId == true || dataError.price == true || dataError.duration == true) {
            return
        }
        setStep(2)
    }

    return (
        <>
            <div className='overflow-y-auto lg:overflow-hidden pr-4 lg:pr-0 w-full h-full lg:h-5/6 flex flex-col justify-start gap-5'>
                <div className='w-full flex flex-col'>
                    <div className='flex flex-col '>
                        <p className='font-semibold text-xl'>Title</p>
                        <p className={`text-sm text-red-600 opacity-0 ${dataError.title && "opacity-100"}`}>* Obligatory Field (min 10 characters)</p>
                    </div>
                    <input placeholder='Tell travelers about your itinerary...' onChange={(e) => setDataItinerary({ ...dataItinerary, title: e.target.value })} className={`w-full py-1 rounded-lg border ${dataError.title ? "border-red-600" : "border-black"} px-2`} type="text" />
                </div>
                <div className='w-full flex flex-col gap-1 '>
                    <div className='flex flex-col'>
                        <p className='font-semibold text-xl'>Photo</p>
                        <p className={`text-sm text-red-600 opacity-0 ${dataError.photo && "opacity-100"}`}>* Obligatory Field</p>
                    </div>

                    {photoItinerary !== undefined ?

                        <div className='w-3/5 md:w-2/5 lg:w-4/5 h-[15vh] md:h-[20vh] lg:h-[15vh] border relative rounded-xl flex items-center justify-center z-0'>
                            <img className='h-full w-full absolute object-cover rounded-xl border' src={photoItinerary} alt="" />
                            <div className='w-full h-2/6 flex items-center justify-center opacity-0 hover:opacity-100 absolute bg-[#00000051] z-20'>
                                <p className='text-white font-semibold text-xl'>Change</p>
                            </div>
                            <input onChange={(e) => getPhoto(e)} className='w-full cursor-pointer opacity-0 h-full z-10' type="file" accept='.jpeg,.png,.jpg' />
                        </div>

                        :
                        <div className={`bg-gray-100 relative w-8/12 h-[15vh] border ${dataError.photo ? "border-red-600" : "border-black"} flex items-center justify-center rounded-lg`}>
                            <input onChange={e => getPhoto(e)} className='w-full h-full opacity-0 z-10' type="file" accept='.jpeg,.png,.jpg' />
                            <div className={`flex flex-col items-center justify-center absolute z-0`}>
                                <p className=''>Upload one photo!</p>
                                <p>press or drag and drop it</p>
                                <img className='w-[8vh]' src={notPhotos} alt="" />
                            </div>
                        </div>}


                </div>
                <div className='w-full flex flex-col gap-1'>
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
                <div className='w-full flex flex-col gap-1'>
                    <div className='flex flex-col'>
                        <p className='font-semibold text-xl'>Price</p>
                        <p className={`text-sm text-red-600 opacity-0 ${dataError.price && "opacity-100"}`}>* Obligatory Field</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <select onChange={(e) => { setPrice(e.target.value, 0) }} className={`w-2/5 lg:w-2/6 border rounded-lg py-1 ${dataError.price ? "border-red-600" : "border-black"}`} name="" id="">
                            <option value="">Select Price</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="4">$$$$$</option>
                        </select>
                        <p>-</p>
                        <select onChange={(e) => { setPrice(e.target.value, 1) }} className={`w-2/5 lg:w-2/6 border rounded-lg py-1 ${dataError.price ? "border-red-600" : "border-black"}`} name="" id="">
                            <option value="">Select Price</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                </div>
                <div className='w-full flex flex-col gap-1'>
                    <div className='flex flex-col'>
                        <p className='font-semibold text-xl'>Duration</p>
                        <p className={`text-sm text-red-600 opacity-0 ${dataError.duration && "opacity-100"}`}>* Obligatory Field (min 5 and 1440 max)</p>
                    </div>
                    <input placeholder='minutes' min={5} max={1440} onChange={(e) => setDataItinerary({ ...dataItinerary, duration: e.target.value })} className={`w-3/5 lg:w-2/6 rounded-lg border px-2 py-1 ${dataError.duration ? "border-red-600" : "border-black"}`} type="number" />
                </div>
            </div>
            <div className='w-full flex items-center justify-center mb-12'>
                <button className='cursor-pointer px-10 py-2 bg-[#2dc77f] rounded-xl text-xl font-semibold text-white' onClick={() => nextStep()}>
                    Continue
                </button>
            </div>
        </>
    )
}

export default ItineraryForm