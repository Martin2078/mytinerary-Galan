import React, { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import itinerarysArrow from '../assets/itinerarysArrow.png'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import noItineraries from '../assets/noItineraries.png'
import CityItinerary from '../components/CityItinerary'
import ItineraryDetail from '../components/ItineraryDetail'
import { useSelector } from 'react-redux'


const City = () => {
  const { id, top } = useParams()
  const { token, user } = useSelector((store) => store.profileReducer)
  const [screenwidth, setScreenWidth] = useState(window.innerWidth)
  const [infoCity, setInfoCity] = useState()
  const [itineraries, setItineraries] = useState()
  const [view, setView] = useState(false)
  const topScroll = useRef(null)
  const itinerariesScroll = useRef(null)
  const [cityDetail, setCityDetails] = useState(false)
  const [dataItinerary, setDataItinerary] = useState()

  async function getCity() {
    let response = await axios.get(`https://mytinerarybackend-7pod.onrender.com/cities/${id}`)
    setInfoCity(response.data.response)
  }
  async function getItineraries() {
    let response = await axios.get(`https://mytinerarybackend-7pod.onrender.com/itineraries/${id}`)
    setItineraries(response.data.response)
  }
  const handleResize = () => {
    setScreenWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    getCity()
    getItineraries()
    scrollToTop()
  }, [])

  function scrollToTop() {
    topScroll.current.scrollIntoView({ behavior: 'smooth' })
  }
  function scrollToItineraries() {
    itinerariesScroll.current.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <div className='w-full'>
      {cityDetail && <ItineraryDetail top={top} setDataItinerary={setDataItinerary} token={token} user={user} dataItinerary={dataItinerary} setCityDetails={setCityDetails} />}

      {screenwidth >= 1024 && <button onClick={() => scrollToItineraries()} className='px-2 py-2 rounded-xl absolute bg-[#2dc77f] right-10 bottom-5 flex items-center gap-2'>
        <p className='text-white text-lg font-semibold'>Itineraries</p>
        <img src={itinerarysArrow} alt="" />
      </button>}
      <div ref={topScroll} className='w-full h-[8vh]'>

      </div>
      <div className='w-full min-h-[100vh] flex flex-col items-start px-4 lg:px-10 gap-5'>
        <div className='w-full h-fit flex flex-col gap-1 lg:gap-2 '>
          <h1 className='text-5xl font-semibold'>{infoCity?.cityName}</h1>
          <h2 className='text-2xl'>{infoCity?.country}</h2>
          <p className='text-[#2dc77f] font-semibold'>#Top{top} most visited cities</p>
        </div>
        <div className='w-full h-[45vh] min-[425px]:h-[50vh] md:h-[55vh] flex flex-col lg:flex-row lg:gap-0 gap-1'>
          <div className='w-full lg:w-8/12 lg:h-full md:h-3/5  mr-5 '>
            <img className='w-full h-full object-cover rounded-lg' src={infoCity?.photo[0]} alt="" />
          </div>
          <div className='w-full lg:w-4/12 lg:h-full md:h-2/5 flex lg:flex-col gap-1 lg:gap-0'>
            <div className='h-full lg:h-3/4 w-full lg:pb-2'>
              <img className='w-full h-full object-cover rounded-lg' src={infoCity?.photo[1]} alt="" />
            </div>
            <div className='h-full lg:h-1/4 w-full'>
              <img className='w-full h-full object-cover rounded-lg' src={infoCity?.photo[2]} alt="" />
            </div>
          </div>
        </div>
        <div className='w-full lg:w-10/12 lg:h-fit'>
          <h3 className='font-semibold text-lg'>Description</h3>
          <div className=''>
            {screenwidth < 1024 ?
              <p className=''>{infoCity?.description.length > 220 ? view ? infoCity?.description : `${infoCity?.description.slice(0, 220)}...` : infoCity?.description}</p>
              :
              <p className=''>{infoCity?.description.length > 530 ? view ? infoCity?.description : `${infoCity?.description.slice(0, 530)}...` : infoCity?.description}</p>

            }
            <button onClick={() => setView(!view)} className={`text-blue-700 font-semibold ${infoCity?.description.length < 530 && "hidden"}`}>{view ? "View Less" : "View More"}</button>
          </div>
        </div>
      </div>
      <div ref={itinerariesScroll} className='w-full h-fit py-5 flex flex-col items-center'>
        {itineraries?.length > 0 ?
          <>
            <div className='w-full h-[10vh] px-4 lg:px-10'>
              <h2 className='text-4xl font-semibold'>Itineraries</h2>
            </div>
            <div className='w-full h-full flex flex-col gap-y-5 md:flex-row flex-wrap items-center justify-center md:gap-x-5 lg:gap-x-10'>
              {itineraries.map((itinerary) => {
                return <CityItinerary setDataItinerary={setDataItinerary} setCityDetails={setCityDetails} itinerary={itinerary} />
              })}
            </div>
          </>
          : <div className='w-full md:w-6/12 h-[50vh] rounded-xl border lg:shadow-md flex flex-col items-center justify-around'>
            <p className='text-2xl lg:text-3xl font-semibold'>There is no itineraries yet!</p>
            <img className='h-3/6' src={noItineraries} alt="" />
            <Link to={'/MyTineraries'} className='w-3/4 md:w-1/2 h-[5vh] rounded-xl bg-[#2dc77f]'><button className='w-full h-full text-white font-semibold text-xl lg:text-2xl'>Make a Itinerary!</button></Link>
          </div>}
      </div>

    </div>
  )
}

export default City