import React from 'react'
import signInBackground from '../assets/signInBackground.jpg'
import google from '../assets/google.png'

const SignIn = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-end px-[10vw]' style={{backgroundImage:`url(${signInBackground})`,backgroundSize:'cover'}}>

      <div className='w-[30vw] h-[60vh] border rounded-xl flex flex-col items-center justify-around bg-white shadow-xl shadow-black'>
        <h1 className='text-2xl'>Welcome Back!</h1>
        <div className='w-full h-3/6 flex flex-col items-center justify-evenly'>
          <div className=''>
            <p>Email</p>
            <input type="text" />
          </div>
          <button>Continue</button>
        </div>
        <button className='w-4/6 h-fit py-2 px-8 bg-gray-600 rounded-lg flex items-center justify-around'>
          <img src={google} alt="" />
          <p>SignIn with Google</p>
        </button>

      </div>

    </div>
  )
}

export default SignIn