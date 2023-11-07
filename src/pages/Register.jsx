import React, { useEffect, useRef, useState } from 'react'
import signInBackground from '../assets/signInBackground2.jpg'
import google from '../assets/google.png'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const mail=useRef()
  const pass=useRef()
  const [data,setData]=useState({})
  const [step,setStep]=useState(1)

  function getEmailAndPassword() {
    setStep(2)
    setData({...data,email:mail.current.value,password:pass.current.value})
    console.log(data);
  }

  async function getEmail() {
    const user=axios.get('')
  }
  useEffect(()=>{

  },[data])

  return (
    <div className='w-screen h-screen flex items-center justify-between'>
    <div className='w-1/2 h-full' style={{ backgroundImage: `url(${signInBackground})`, backgroundSize: 'contain' }}>

    </div>
    
    <div className='w-1/2 h-full flex items-center justify-center'>
     <div className='w-[30vw] h-[60vh] border rounded-xl flex flex-col items-center px-10 py-8 justify-around bg-white shadow-xl shadow-black'>
       {step===1? <>
       <div className='w-full h-4/5 flex flex-col gap-5 border-b'>
          <p className='font-light'>Step 1 of 2</p>
          <h1 className='text-3xl font-semibold'>Register</h1>
          <div className='flex w-full gap-2'>
          <p>Already have an account?</p>
          <button><Link to={'/SignIn'}><p className='text-blue-600'>Sign In</p></Link></button>
          </div>
          <div className='w-full'>
            <p className='text-xs font-light'>Email</p>
            <input ref={mail} className='border-b text-sm border-black w-full outline-none' placeholder='email@gmail.com' type="text" />
          </div>
          <div className='w-full'>
            <p className='text-xs font-light'>Password</p>
            <input ref={pass} className='border-b text-sm border-black w-full outline-none' placeholder='xxxx' type="password" />
          </div>
          <div className='w-full flex justify-end'>
          <button onClick={()=>getEmailAndPassword()} className='px-6 py-2 bg-emerald-500 rounded-lg'>
            <p className='text-white font-semibold'>Continue</p>
          </button>
          </div>
        </div>
        <div className='w-full h-2/6 flex flex-col items-center justify-end gap-4'>
        <button className='w-5/6 h-fit py-2 bg-emerald-500 rounded-lg flex items-center justify-center gap-4'>
            <img src={google} alt="" />
            <p>SignIn with Google</p>
          </button>
          <button className='w-5/6 h-fit py-2 bg-emerald-500 rounded-lg flex items-center justify-center gap-4'>
            <img src={google} alt="" />
            <p>SignIn with Google</p>
          </button>
        </div>
        </>
        : 
        <>
        <div className='w-full h-4/5 flex flex-col justify-center gap-5'>
          <p className='font-light'>Step 2 of 2</p>
          <h1 className='text-3xl font-semibold'>Register</h1>
          <div className='flex w-full gap-2'>
          <p>Already have an account?</p>
          <button><Link to={'/SignIn'}><p className='text-blue-600'>Sign In</p></Link></button>
          </div>
          <div className='w-full'>
            <p className='text-xs font-light'>Name</p>
            <input className='border-b text-sm border-black w-full outline-none' type="text" />
          </div>
          <div className='w-full'>
            <p className='text-xs font-light'>Surname</p>
            <input className='border-b text-sm border-black w-full outline-none' type="password" />
          </div>
          <div className='w-full'>
            <p className='text-xs font-light'>Date</p>
            <input className='border-b text-sm border-black w-full outline-none' placeholder='xxxx' type="date" />
          </div>
          <div className='w-full'>
            <p className='text-xs font-light'>photo</p>
            <input className='border-b text-sm border-black w-full outline-none' placeholder='xxxx' type="password" />
          </div>
          <div className='w-full flex justify-end'>
          <button onClick={()=>getEmail()} className='px-6 py-2 bg-emerald-500 rounded-lg'>
            <p className='text-white font-semibold'>Continue</p>
          </button>
          </div>
        </div>
        </>}
     </div>


    </div>

  </div>
  )
}

export default Register