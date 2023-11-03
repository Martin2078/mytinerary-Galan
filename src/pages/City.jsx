import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'
import buenosAires from '../assets/buenosAires.jpg'
import itinerarysArrow from '../assets/itinerarysArrow.png'
const City = () => {
  const {id}=useParams()
  const itineraryScroll=useRef(null)

  function scrollToItinerarys() {
    itineraryScroll.current.scrollIntoView({behavior:'smooth'})
  }
  return (
    <div className='w-full min-h-[200vh]'>
      <div className='w-full h-[100vh] flex items-center justify-center' style={{ backgroundImage: `url(${buenosAires})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
          <div className='w-3/6 h-3/6 flex flex-col items-center justify-start gap-5'>
            <h1 className='text-5xl text-white font-semibold'>City Name</h1>
            <p className='text-lg text-white text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione optio vel quo minima nemo magnam quos fugit, eos consequatur deserunt eligendi exercitationem, ducimus cumque et quisquam perferendis eveniet dignissimos repellat.</p>
            <button onClick={()=>scrollToItinerarys()} className='w-4/12 h-10 bg-emerald-500 rounded-lg flex items-center'>
              <p className='w-5/6 text-lg text-white font-semibold'>View Itinerary</p>
              <img className='h-3' src={itinerarysArrow} alt="" />
            </button>
          </div>
      </div>
      <div className='w-full min-h-[100vh]' ref={itineraryScroll}>

      </div>
        
    </div>
  )
}

export default City