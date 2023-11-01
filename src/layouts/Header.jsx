import React from 'react'
import { Link } from 'react-router-dom'
import SignInIcon from '../assets/SignInIcon.png'
const Header = () => {
  return (
    <div className='w-screen h-[6vh] bg-[#00000094] fixed top-0 py-2 px-28 flex justify-between items-center'>
      <h1 className='text-2xl font-semibold text-white'>MyTinerary</h1>
      <div className='flex items-center justify-center gap-4'>
        <Link to={"/"}><p className='text-white'>Home</p></Link>
        <Link to={"/Cities"}><p className='text-white'>Cities</p></Link>
        <button className='w-20 h-8 py-1 px-2 rounded-xl bg-emerald-500'>
          <Link className='flex items-center justify-center gap-1' to={"/SignIn"}> 
          <img className='w-4 h-4' src={SignInIcon} alt="" />
          <p className='text-white'>Login</p>
          </Link>
        </button>
      </div>
    </div>
  )
}

export default Header