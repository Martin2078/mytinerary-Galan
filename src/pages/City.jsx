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
  const [data, setData] = useState()
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
    <div className='w-full min-h-[200vh]'>
      <div className='w-full h-[100vh] flex flex-col items-start mt-[8vh] px-10 gap-5'>
        <div className='w-full h-fit '>
        <h1 className='text-5xl font-semibold'>{infoCity?.cityName}</h1>
        <h2 className='text-2xl'>{infoCity?.country}</h2>
        </div>
        <div className='w-full h-[60vh] flex '>
          <div className='w-8/12 h-full mr-5 '>
            <img className='w-full h-full object-cover rounded-lg' src={infoCity?.photo[0]} alt="" />
          </div>
          <div className='w-4/12 h-full'>
            <div className='h-3/4 w-full pb-2'>
              <img className='w-full h-full object-cover rounded-lg' src={infoCity?.photo[1]} alt="" />
            </div>
            <div className='h-1/4 w-full'> 
              <img className='w-full h-full object-cover rounded-lg' src={infoCity?.photo[2]} alt="" />
            </div>
          </div>
        </div>
        <div className='w-10/12 h-[18vh]'>
        <h3 className='font-semibold text-lg'>Description</h3>
        <p>{infoCity?.description}</p>
        </div>
      </div>
      <div className='w-full min-h-[100vh]' ref={itineraryScroll}>

      </div>

    </div>
  )
}

export default City