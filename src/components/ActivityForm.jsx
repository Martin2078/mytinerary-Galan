import React, { useEffect, useState } from 'react'
import notPhotos from '../assets/notPhotos.png'

const ActivityForm = ({ dataItinerary, setDataItinerary, setActivityAdd,activityPhotos,setActivityPhotos }) => {
    
    const [activity, setActivity] = useState({
        name: "",
        description: "",
        photo: [],
        ubication: ""
    })
    const [activityError, setActivityError] = useState({
        name: false,
        description: false,
        photo: false,
        ubication: false
    })
    const [urlPhotos,setUrlPhotos]=useState([])

    function getPhotos(e) {
        let arrayPhotos = []
        let photosArray = Array.from(e.target.files)
        setActivity({ ...activity, photo: photosArray })
        for (let i = 0; i < photosArray.length; i++) {
            let url = URL.createObjectURL(photosArray[i])
            arrayPhotos.push(url)
        }
        setUrlPhotos(arrayPhotos)

    }

    function renderPhotos() {
        let template = []
        for (let i = 0; i < urlPhotos.length; i++) {
            template.push(<img className='h-full w-[7vw] object-cover rounded-xl' src={urlPhotos[i]} alt="" />)
        }
        return template
    }

    function addActivity() {
        setActivityError({
            name: activity.name == "" ? activityError.name = true : activityError.name = false,
            description: activity.description == "" || activity.description.length < 50 ? activityError.description = true : activityError.description = false,
            photo: activity.photo.length==0 ? activityError.photo = true : activityError.photo = false,
            ubication: activity.ubication == "" ? activityError.ubication = true : activityError.ubication = false,
        })
                                                                                
        if (activityError.name == true || activityError.description == true || activityError.photo == true || activityError.ubication == true) {
            return
        }
        
        setDataItinerary({ ...dataItinerary, activities: [...dataItinerary.activities, activity] })
        setActivity({
            name: "",
            description: "",
            photo: [],
            ubication: ''
        })
        setActivityPhotos([...activityPhotos,urlPhotos[0]])
        setActivityAdd(false)
    }
    useEffect(()=>{

    },[])
    return (
        <div className='w-[35vw] animationMyItinerary relative h-screen bg-white flex flex-col items-center justify-center gap-2 px-8 rounded-l-2xl'>
            <div className='w-full h-[10vh] flex flex-col items-center justify-center border-b'>
                <h1 className='text-4xl font-semibold'>Activity {dataItinerary.activities.length + 1}</h1>
            </div>
            <div className='w-full h-full flex flex-col justify-start gap-6'>
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
                    {urlPhotos.length > 0
                        ?
                        <div className='w-full h-[15vh] flex flex-col gap-2'>
                            <div className='w-full h-4/5 flex gap-5 overflow-x-auto'>
                                {renderPhotos()}
                            </div>
                            <div className='w-2/6 h-1/5 bg-[#2dc77f] border flex items-center rounded-xl justify-center relative'>
                                <p className='absolute font-semibold text-white'>Change</p>
                                <input onChange={(e) => getPhotos(e)} className='w-full h-full opacity-0 ' accept='.jpeg,.png,.jpg' type="file" multiple />
                            </div>
                        </div>
                        :
                        <div className={`bg-gray-100 relative w-8/12 h-[12vh] border ${activityError.photo ? "border-red-600" : "border-black"} flex items-center justify-center rounded-lg`}>
                            <input onChange={e => getPhotos(e)} className='w-full h-full opacity-0 z-10' type="file" multiple accept='.jpeg,.png,.jpg' />
                            <div className={`flex flex-col items-center justify-center absolute z-0`}>
                                <p className=''>Upload one or more photos!</p>
                                <p>press or drag and drop them</p>
                                <img className='w-[4vh]' src={notPhotos} alt="" />
                            </div>
                        </div>}
                </div>

                <div className='w-full flex flex-col gap-2 items-end'>
                    <div className='w-full flex items-center justify-between'>
                        <p className='font-semibold text-xl'>Description</p>
                        <p className={`text-sm text-red-600 opacity-0 ${activityError.description && "opacity-100"}`}>* Obligatory field (minimum 50 characters)</p>
                    </div>
                    <textarea placeholder='Describe this activity...' onChange={(e) => setActivity({ ...activity, description: e.target.value })} className={`w-full h-[15vh] py-1 rounded-lg border ${activityError.description ? "border-red-600" : "border-black"} px-2 text-left resize-none`} type="text"></textarea>
                    <p className='font-extralight'>{activity.description.length} of 50 characters minimum</p>
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
    )
}

export default ActivityForm