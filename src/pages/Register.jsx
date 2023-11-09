import React, { useEffect, useRef, useState } from 'react'
import signInBackground from '../assets/signInBackground2.jpg'
import google from '../assets/google.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster }  from 'react-hot-toast'
import showPassword from '../assets/showPassword.png'
import notShowPassword from '../assets/notShowPassword.png'
import facebook from '../assets/facebook.png'
import RegisterVideo from '../assets/RegisterVideo.mp4'

const Register = () => {
  const [data,setData]=useState({})
  const [step,setStep]=useState(1)
  const [passwordView,setPasswordView]=useState(false)
  const navigate=useNavigate()

  function getEmailAndPassword() {
    setStep(2)
  }

  async function registerFunction() {
    console.log(data);
    if (data.name=="" || !data.name) {
      toast.error("Name cannot be empty!")
      return
    }
    if (data.surname=="" || !data.surname) {
      toast.error("Surname cannot be empty!")
      return
    }
    if (data.date=="" || !data.date) {
      toast.error("Date cannot be empty!")
      return
    }
    if (data.date>"2005-01-01") {
      toast.error("You must be older than 18 years old!")
      return
    }
    if (data.photo=="" || !data.photo) {
      toast.error("Photo cannot be empty!")
      return
    }
    data.email=data.email.toLowerCase()
    data.name=data.name.charAt(0).toUpperCase() + data.name.slice(1)
    data.surname=data.surname.charAt(0).toUpperCase() + data.surname.slice(1)
    const newUser=await axios.post('http://localhost:8080/auth/Register',data)
    if (newUser.data.success===true) {
      toast.success(newUser.data.message)
      setTimeout(()=>{navigate('/SignIn')},2000)
    }else{
      toast.error(newUser.data.error)
    }
   
  }

  useEffect(()=>{
    
  },[data])

  return (
    <div className='w-screen h-screen flex items-center justify-between'>
      <Toaster position='top-center'/>
    <div className='w-1/2 h-full hidden lg:block'>
      <video autoPlay loop muted className='w-full h-full object-cover'>
      <source src={RegisterVideo} />
      </video>
    </div>
    
    <div className='w-full lg:w-1/2 h-full flex items-end md:items-center justify-center'>
    <div className={`w-[90vw] md:w-[60vw] md:mb-0 lg:w-[35vw] xl:w-[30vw] ${step==1?"h-[65vh] mb-[10vh]":"h-[65vh] mb-[5vh]"} lg:h-[60vh] xl:h-[65vh] rounded-xl flex flex-col items-center px-6 lg:px-10 py-8 justify-around bg-white shadow-xl shadow-black`}>
       {step===1? <>
       <div className='w-full h-4/5 flex flex-col gap-3 xl:gap-5'>
          <p className='font-light'>Step 1 of 2</p>
          <h1 className='text-3xl font-semibold'>Register</h1>
          <div className='flex w-full gap-2'>
          <p>Already have an account?</p>
          <button><Link to={'/SignIn'}><p className='text-blue-600'>Sign In</p></Link></button>
          </div>
          <div className='w-full'>
            <p className='text-sm font-lighttext-sm lg:text-xs font-light'>Email</p>
            <input onChange={(e)=>setData({...data,email:e.target.value})} className='border-b text-sm border-black w-full outline-none' placeholder='email@gmail.com' type="text" />
          </div>
          <div className='w-full'>
            <p className='text-sm font-lighttext-sm lg:text-xs font-light'>Password</p>
            <div className='border-b text-sm border-black w-full h-6 flex items-center'>
            <input onChange={(e)=>setData({...data,password:e.target.value})} className='w-11/12 outline-none h-full' placeholder='xxxx' type={`${passwordView?"text":"password"}`} />
              <img onClick={()=>setPasswordView(!passwordView)} className='w-5 h-5 cursor-pointer' src={passwordView?showPassword:notShowPassword} alt="" />
              </div>
          </div>
          <div className='w-full flex justify-end'>
          <button onClick={()=>getEmailAndPassword()} className='px-6 py-2 bg-emerald-500 rounded-lg'>
            <p className='text-white font-semibold'>Continue</p>
          </button>
          </div>
        </div>
        <div className='w-full h-[15vh] flex flex-col items-center justify-end gap-4'>
        <button className='w-full h-fit py-2 border shadow-md  rounded-lg flex items-center justify-center lg:gap-2'>
              <img src={google} alt="" />
              <p className='w-3/5 lg:w-4/6 text-sm lg:text-base'>SignIn with Google</p>
            </button>
            <button className='w-full h-fit py-2 shadow-md bg-blue-600 rounded-lg flex items-center justify-center lg:gap-2'>
              <img className='w-6' src={facebook} alt="" />
              <p className='text-white w-3/5 lg:w-4/6 text-sm lg:text-base'>SignIn with Facebook</p>
            </button>
        </div>
        </>
        : 
        <>
        <div className='w-full h-4/5 flex flex-col justify-center gap-5'>
          <p className='font-light'>Step 2 of 2</p>
          <h1 className='text-3xl font-semibold'>Register</h1>
          <div className='w-full'>
            <p className='text-sm lg:text-xs font-light'>Name</p>
            <input  onChange={(e)=>setData({...data,name:e.target.value})} className='border-b text-sm border-black w-full outline-none' type="text" />
          </div>
          <div className='w-full'>
            <p className='text-sm lg:text-xs font-light'>Surname</p>
            <input onChange={(e)=>setData({...data,surname:e.target.value})} className='border-b text-sm border-black w-full outline-none' type="text" />
          </div>
          <div className='w-full'>
            <p className='text-sm lg:text-xs font-light'>Date</p>
            <input onChange={(e)=>setData({...data,date:e.target.value})} className='border-b text-sm border-black w-full outline-none' placeholder='xxxx' type="date" />
          </div>
          <div className='w-full'>
            <p className='text-sm lg:text-xs font-light'>photo</p>
            <input onChange={(e)=>setData({...data,photo:e.target.value})} className='border-b text-sm border-black w-full outline-none' placeholder='url' type="url" />
          </div>
          <div className='w-full flex justify-end'>
          <button onClick={()=>registerFunction()} className='lg:px-6 lg:py-2 px-4 py-1 bg-emerald-500 rounded-lg'>
            <p className='text-white font-semibold'>Register</p>
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