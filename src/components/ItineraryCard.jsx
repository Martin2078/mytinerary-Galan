import React from 'react'
import favorite from '../assets/favorite.png'
import editIcon from '../assets/edit.png'
import deleteIcon from '../assets/delete.png'

const ItineraryCard = ({itinerary}) => {
  return (
    <div className='w-full md:w-[30vw] lg:w-[25vw] xl:w-[20vw] h-[20vh] py-2 px-3 flex flex-col rounded-lg items-center justify-between relative'>
                    <img className='absolute top-0 w-full h-full hover:opacity-90 object-cover z-0 rounded-lg' src={itinerary?.photo} alt="" />
                    <div className='w-full flex items-center justify-between z-10'>
                      <h3 className='font-semibold text-white text-xl'>{itinerary?.title}</h3>
                    </div>
                    <div className='w-full flex items-center justify-between gap-4 z-10'>
                      <div className='flex items-center gap-1'>
                        <p className='text-white'>{itinerary?.likes}</p>
                        <img className='w-5' src={favorite} alt="" />
                      </div>
                      <div className='flex items-center gap-4'>
                      <button><img className='w-5' src={editIcon} alt="" /></button>
                      <button><img className='w-5' src={deleteIcon} alt="" /></button>
                      </div>
                    </div>
                  </div>
  )
}

export default ItineraryCard