import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'
import buenosAires from '../assets/buenosAires.jpg'
import itinerarysArrow from '../assets/itinerarysArrow.png'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import noItineraries from '../assets/noItineraries.png'
import CityItinerary from '../components/CityItinerary'
import ItineraryDetail from '../components/ItineraryDetail'
import { useSelector } from 'react-redux'

const City = () => {
  const { id } = useParams()
  const { token, user }=useSelector((store)=>store.profileReducer)
  const [infoCity, setInfoCity] = useState()
  const [itineraries, setItineraries] = useState()
  const [view, setView] = useState(false)
  const topScroll = useRef(null)
  const itinerariesScroll = useRef(null)
  const [cityDetail,setCityDetails]=useState(false)
  const [dataItinerary,setDataItinerary]=useState()

  async function getCity() {
    let response = await axios.get(`http://localhost:8080/cities/${id}`)
    setInfoCity(response.data.response)
  }
  async function getItineraries() {
    let response = await axios.get(`http://localhost:8080/itineraries/${id}`)
    setItineraries(response.data.response)
  }

  useEffect(() => {
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
    <div className='w-full h-[200vh] overflow-hidden'>
      <button onClick={() => scrollToItineraries()} className='px-2 py-2 rounded-xl absolute bg-[#2dc77f] right-10 bottom-5 flex items-center gap-2'>
        <p className='text-white text-lg font-semibold'>Itineraries</p>
        <img src={itinerarysArrow} alt="" />
      </button>
      <div ref={topScroll} className='w-full h-[8vh]'>

      </div>
      <div className='w-full h-[100vh] flex flex-col items-start px-10 gap-5'>
        <div className='w-full h-fit flex flex-col gap-2 '>
          <h1 className='text-5xl font-semibold'>{infoCity?.cityName}</h1>
          <h2 className='text-2xl'>{infoCity?.country}</h2>
          <p className='font-light'>Visitors: {infoCity?.popularity}</p>
        </div>
        <div className='w-full h-[55vh] flex '>
          <div className='w-8/12 h-full mr-5 '>
            <img className='w-full h-full object-cover rounded-lg' src={infoCity?.photo[0]} alt="" />
          </div>
          <div className='w-4/12 h-full'>
            <div className='h-3/4 w-full pb-2'>
              <img className='w-full h-full object-cover rounded-lg' src={infoCity?.photo[1]} alt="" />
            </div>
            <div className='h-1/4 w-full'>
              <img className='w-full h-full object-cover rounded-lg' src={infoCity?.photo[2]} alt="" />            </div>
          </div>
        </div>
        <div className='w-10/12 h-[18vh]'>
          <h3 className='font-semibold text-lg'>Description</h3>
          <div className=''>
            <p className=''>{infoCity?.description.length > 530 ? view ? infoCity?.description : `${infoCity?.description.slice(0, 530)}...` : infoCity?.description}</p>
            <button onClick={() => setView(!view)} className={`text-blue-700 font-semibold ${infoCity?.description.length < 530 && "hidden"}`}>{view ? "View Less" : "View More"}</button>
          </div>
        </div>
      </div>
      <div ref={itinerariesScroll} className='w-full min-h-[100vh] flex flex-wrap items-center justify-center gap-x-10'>
      {cityDetail && <ItineraryDetail setDataItinerary={setDataItinerary} token={token} user={user} dataItinerary={dataItinerary} setCityDetails={setCityDetails}/>}
        {itineraries?.length > 0 ?<>
        <div className='w-full h-[10vh] px-10'>
          <h2 className='text-4xl font-semibold'>Itineraries</h2>
        </div>
          {itineraries.map((itinerary) => {
            return <CityItinerary setDataItinerary={setDataItinerary} setCityDetails={setCityDetails} itinerary={itinerary}/>
          })}</>
          : <div className='w-6/12 h-[50vh] rounded-xl border shadow-md flex flex-col items-center justify-around'>
            <p className='text-3xl font-semibold'>There is no itineraries yet!</p>
            <img className='h-3/6' src={noItineraries} alt="" />
          </div>}
      </div>

    </div>
  )
}

export default City