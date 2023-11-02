import React, { useState } from 'react'
import searchIcon from '../assets/search-icon.png'
import { Link } from 'react-router-dom'
import ubication from '../assets/ubication.png'
import buenosAires from '../assets/buenosAires.jpg'
import City from './City'
const Cities = () => {
  const [open,setOpen]=useState(false)
  return (
    <div className='w-full min-h-screen '>
      <div className='w-full h-[45vh] bg-black'>

      </div>
      <div className='w-full h-full flex flex-col items-center mt-[2vh] '>
        <div className='flex items-center justify-center w-4/12 h-[4vh] rounded border px-4 py-1 checked:border-2'>
          <input className='w-full h-full outline-none' type="text" placeholder='Search city or country'/>
          <img className='h-full' src={searchIcon} alt="" />
        </div>
        <div className='max-w-[100vw] min-h-[47vh] mt-[2vh] flex flex-wrap items-start justify-center py-[3vh] px-[4vw] gap-y-[4vh] gap-x-[3vw]'>
          
          <div className='w-[20vw] h-[20vh] rounded-xl bg-white px-3 py-3 flex flex-col justify-between hover:scale-110' style={{ backgroundImage: `url(${buenosAires})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
            <div className='flex flex-col gap-1'>
              <h4 className='text-white font-bold text-lg'>Buenos Aires</h4>
              <div className='flex items-center'>
                <img className='h-5' src={ubication} alt="" />
                <p className='text-white text-base'>Argentina</p>
              </div>
            </div>
            <button className='w-3/6 bg-emerald-500 rounded py-1'><Link to={`/Cities/${2323213123321}`}><p className='text-white'>View More</p></Link></button>
          </div>
         
          <div className='w-full h-[5vh] flex justify-center mt-[1vh] gap-4'>
            <button>fle</button>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>fle</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Cities