import React from 'react'
import editIcon from '../assets/edit.png'
import deleteIcon from '../assets/delete.png'
import axios from 'axios'

const ItineraryCard = ({ itinerary, toast,token,setRender,setEdit }) => {

  async function deleteItinerary() {
    let headers = { headers: { 'Authorization': `Bearer ${token}` } }
    let response = await axios.delete(`http://localhost:8080/itineraries/${itinerary._id}`,headers)
    if (response.data.success==true) {
      toast.success(response.data.message)
      setRender(prev=>!prev)
    }
  }

  return (
    <div className='w-full md:w-[30vw] lg:w-[25vw] xl:w-[20vw] h-[20vh]  flex flex-col rounded-lg items-center justify-end relative'>
      <img className='absolute top-0 w-full h-full hover:opacity-90 object-cover z-0 rounded-lg' src={itinerary?.photo} alt="" />
      <div className='w-full bg-[#00000085] flex items-center justify-between gap-4 px-2 py-1 z-10'>
        <h3 className='font-semibold text-white text-xl'>{itinerary?.title}</h3>
        <div className='flex items-center gap-4'>
          <button onClick={()=>setEdit(itinerary)}><img className='w-5' src={editIcon} alt="" /></button>
          <button onClick={() => toast.custom((t) => (
            <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} px-5 py-2 text-center max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 flex-col items-center gap-2`}>
             <div className='w-full'>
             <p className='text-2xl font-semibold'>You will delete this itinerary permanently</p>
             <p className='text-xl'>Are you sure?</p>
             </div>
              <div className='w-full h-[5vh] flex justify-evenly'>
                <button onClick={()=>toast.dismiss(t.id)} className='w-1/3 h-full border rounded-lg bg-red-600'><p className='text-white font-semibold text-xl'>Close</p></button>
                <button onClick={()=>{deleteItinerary();toast.dismiss(t.id)}} className='w-1/3 h-full border rounded-lg bg-[#2dc77f]'><p className='text-white font-semibold text-xl'>Delete</p></button>
              </div>
            </div>
          ))}><img className='w-5' src={deleteIcon} alt="" /></button>
        </div>
      </div>
    </div>
  )
}

export default ItineraryCard