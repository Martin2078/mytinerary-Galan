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
  const data = ["https://firebasestorage.googleapis.com/v0/b/mytineraryfirebase.appspot.com/o/backgroundImage.jpg?alt=media&token=9167d8c8-f1e9-4eae-a44c-3e12dcb9760c", 'https://firebasestorage.googleapis.com/v0/b/mytineraryfirebase.appspot.com/o/backgroundImage2.jpg?alt=media&token=9666a29f-bce6-41e2-8d36-a5d2b3e52097', "https://firebasestorage.googleapis.com/v0/b/mytineraryfirebase.appspot.com/o/backgroundImage3.jpg?alt=media&token=9a185c63-cfe0-4453-a57b-38ff3bd1465f", "https://firebasestorage.googleapis.com/v0/b/mytineraryfirebase.appspot.com/o/backgroundImage6.jpg?alt=media&token=6e97cdb2-b835-41b2-ad9b-14bf82787766"]

  return (
    <div className='w-screen h-screen'>
      <Carrousel data={data} classes={"w-screen h-screen absolute"}/>
      <div className='w-screen min-h-[82vh] flex items-center justify-start'>
        <div className='text-center md:text-left w-full md:w-[65vw] lg:w-[55vw] h-[28vh] lg:h-[30vh] px-5 md:px-10 lg:px-16 py-1 rounded-xl flex flex-col items-center md:items-start justify-between '>
          <div className='w-full h-4/6 flex flex-col justify-evenly'>
            <h2 className='text-white text-2xl lg:text-4xl xl:text-5xl font-semibold z-10'>Welcome to MyTinerary!</h2>
            <p className='text-white font-semibold lg:font-normal text-sm lg:text-base xl:text-lg w-full lg:w-10/12 xl:w-8/12 z-10'>Find your perfect trip, designed by insiders who know and love their cities!.  We'll take you to iconic places and hidden gems for unforgettable experiences.</p>
          </div>
          <button className='w-4/5 md:w-4/6 xl:w-3/6 h-10 lg:h-12 rounded-xl bg-[#2dc77f] z-10'>
            <Link to={"/Cities"}>
              <p className='text-lg lg:text-2xl text-white font-semibold'>Start your adventure!</p>
            </Link>
          </button>
        </div>
      </div>
      <div className='w-screen h-[12vh] lg:px-16 py-2 flex items-center justify-center lg:justify-start gap-14 absolute bottom-0'>
        <img className='h-7' src={instagram} alt="" />
        <img className='h-7' src={twitter} alt="" />
        <img className='h-6 border-white border rounded-lg' src={facebook} alt="" />
      </div>
    </div>



  )
}

export default Home