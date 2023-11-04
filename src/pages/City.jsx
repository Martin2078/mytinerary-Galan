import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'
import buenosAires from '../assets/buenosAires.jpg'
import itinerarysArrow from '../assets/itinerarysArrow.png'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import Carrousel from '../components/Carrousel'

const City = () => {
  const { id } = useParams()
  const [infoCity, setInfoCity] = useState()
  const [data,setData]=useState()
  const itineraryScroll = useRef(null)

  async function getCity() {
    let response = await axios.get(`http://localhost:8080/cities/${id}`)
    setInfoCity(response.data.response)
    setData(response.data.response.photo)
  }
  useEffect(() => {
    getCity()
  }, [])

  function scrollToItinerarys() {
    itineraryScroll.current.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <div className='w-screen min-h-[200vh]'>
      <div className='w-screen h-[100vh] flex items-center justify-center'>
      {data&&<Carrousel data={data} classes={"h-full w-full absolute left-0 top-0"} img={"w-screen h-screen object-cover"}/>}
        <div className='w-3/6 h-4/6 flex flex-col items-center justify-center gap-5 bg-[#17171743] rounded-xl px-10 z-10'>
          <h1 className='text-5xl text-white font-semibold z-10'>{infoCity?.cityName}</h1>
          <p className='text-lg text-white text-center z-10'>{infoCity?.description}</p>
          <button onClick={() => scrollToItinerarys()} className='z-10 w-4/12 h-10 bg-emerald-500 rounded-lg flex items-center'>
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