import React from 'react'
import { Link } from 'react-router-dom'
import instagram from '../assets/instagram.png'
import twitter from '../assets/twitter.png'
import facebook from '../assets/facebook.png'
import Carrousel from '../components/Carrousel'
import backgroundImage from '../assets/backgroundImage.jpg'
import backgroundImage2 from '../assets/backgroundImage2.jpg'
import backgroundImage3 from '../assets/backgroundImage3.jpg'
import backgroundImage6 from '../assets/backgroundImage6.jpg'

const Home = () => {
  const data = [backgroundImage, backgroundImage2, backgroundImage3, backgroundImage6]

  return (
    <div className='w-screen h-screen'>
      <Carrousel data={data} classes={"w-screen h-screen fixed top-0"} img={'w-screen h-screen'}/>
      <div className='w-screen min-h-[82vh] flex items-center justify-start'>
        <div className='w-[55vw] h-[30vh] px-16 py-1 rounded-xl flex flex-col items-start justify-between '>
          <div className='w-full h-4/6 flex flex-col justify-evenly'>
            <h2 className='text-white text-5xl font-semibold z-10'>Welcome to MyTinerary!</h2>
            <p className='text-white text-base w-8/12 z-10'>Find your perfect trip, designed by insiders who know and love their cities!.  We'll take you to iconic places and hidden gems for unforgettable experiences.</p>
          </div>
          <button className='w-3/6 h-12 rounded-xl bg-emerald-500 z-10'>
            <Link to={"/Cities"}>
              <p className='text-2xl text-white font-semibold'>Start your adventure!</p>
            </Link>
          </button>
        </div>
      </div>
      <div className='w-screen h-[12vh] px-16 py-2 flex items-center justify-start gap-14 absolute bottom-0'>
        <img className='h-7' src={instagram} alt="" />
        <img className='h-7' src={twitter} alt="" />
        <img className='h-6 border-white border rounded-lg' src={facebook} alt="" />
      </div>
    </div>



  )
}

export default Home