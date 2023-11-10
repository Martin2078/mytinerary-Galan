import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import favorite from '../assets/favorite.png'
import editIcon from '../assets/edit.png'
import deleteIcon from '../assets/delete.png'
import backgroundImage from '../assets/backgroundImage.jpg'
import searchIcon from '../assets/search-icon.png'

const MyTineraries = () => {
  const { token, user } = useSelector((store) => store.profileReducer)
  const [myTineraries, setMyTineraries] = useState()
  async function getUserItineraries() {
    const response = await axios.get(`http://localhost:8080/itineraries/me/${user._id}`)
    setMyTineraries(response.data.response)
    console.log(response.data.response);
  }

  useEffect(() => {
    getUserItineraries()
  }, [])

  return (
    <div className='w-full h-screen flex pt-[10vh] px-10 flex-col justify-between'>
      <div className='w-full h-[10vh] flex items-center justify-between'>
        <h1 className='text-5xl font-semibold'>MyTineraries</h1>
        <div className='w-1/6 flex border-2 rounded-lg mr-14'>
          <input className='w-full px-1 rounded-lg outline-none' placeholder='search country' type="text" />
          <img src={searchIcon} alt="" />
        </div>
      </div>

      <div className='w-full min-h-[75vh] flex flex-col items-center gap-[5vh] '>
        <div className='w-[85vw] h-[30vh] shadow-md border rounded-xl px-5 pt-2'>
          <h2 className='text-3xl font-semibold'>Argentina</h2>
          <div className='w-full h-5/6 px-1 pb-2 flex items-end overflow-x-hidden whitespace-nowrap gap-[2vw]'>

            <div className='w-[20vw] h-[20vh] py-3 px-4 border rounded-lg flex flex-col items-center justify-between hover:opacity-90' style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
              <div className='w-full flex items-center justify-between'>
                <h3 className='font-semibold text-white text-xl'>City</h3>
                <div className='flex items-center gap-1'>
                  <p className='text-white'>231</p>
                  <img className='w-5' src={favorite} alt="" />
                </div>
              </div>
              <div className='w-full flex items-center justify-end gap-4'>
                <button><img className='w-5' src={editIcon} alt="" /></button>
                <button><img className='w-5' src={deleteIcon} alt="" /></button>
              </div>
            </div>



          </div>
        </div>

        {/* {myTineraries?.length>0?
    myTineraries.map((itinerary)=>{
      return <div className='w-10/12 h-[40vh]'>
        <h2>Pais</h2>
        <div>

        </div>
      </div>
    })
    :
    <div className='w-[60vw] h-[80vh]'>
      <p>You didnt create Itineraries!</p>
      </div>
    } */}
      </div>

    </div>
  )
}

export default MyTineraries