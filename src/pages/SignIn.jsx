import React, { useEffect, useRef, useState } from 'react'
import signInBackground from '../assets/signInBackground2.jpg'
import google from '../assets/google.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import profile from '../redux/actions/userAction'
import toast, { Toaster } from 'react-hot-toast'
import showPassword from '../assets/showPassword.png'
import notShowPassword from '../assets/notShowPassword.png'
import facebook from '../assets/facebook.png'
import SignInVideo from '../assets/SignInVideo.mp4'

const SignIn = () => {
  const password=useRef()
  const [mail,setMail]=useState("")
  const [pass,setPass]=useState("")
  const [userFinded,setUserFinded]=useState({})
  const [step,setStep]=useState(1)
  const dispatch=useDispatch()
  const {token,user}=useSelector(store=>store.profileReducer)
  const [passwordView,setPasswordView]=useState(false)
  const navigate=useNavigate()


  async function getEmail() {
    setMail(mail.toLowerCase())
    const email=mail.toLowerCase()
    console.log(email);
    const finded=await axios.get(`http://localhost:8080/auth?email=${email}`)
    console.log(finded.data);
    if (finded.data.error) {
      toast.error(finded.data.error)
    }else{
      setUserFinded(finded.data.response[0])
      setStep(2)
    }
  }
  async function SignInUser() {
    const objeto={
      email:mail,
      password:pass
    }
    const response = await axios.post('http://localhost:8080/auth/SignIn',objeto)
    if (response.data.error) {
      toast.error(response.data.error) 
      return
    }else{
      toast.success(response.data.message)
      setTimeout(()=>{
        localStorage.setItem("token",response.data.response.token)
      localStorage.setItem("user",JSON.stringify(response.data.response.userFinded))
      dispatch(profile(response.data.response))
      },2000)
      
    }
  }
  return (
    <div className='w-screen h-screen flex items-center justify-between'>
     <Toaster position='top-center'/>
      <div className='w-1/2 h-full'>
        <video autoPlay loop muted className='w-full h-full object-cover'>
          <source src={SignInVideo}/>
        </video>

      </div>
      
      <div className='w-1/2 h-full flex items-center justify-center'>
       <div className='w-[30vw] h-[60vh] border rounded-xl flex flex-col items-center px-10 py-8 justify-around bg-white shadow-xl shadow-black'>
          {step==1
          ?
          <div className='w-full h-4/5 flex flex-col gap-5 border-b'>
            <p className='font-light'>Step 1 of 2</p>
            <h1 className='text-3xl font-semibold'>Sign In</h1>
            <div className='flex w-full gap-2'>
            <p>New User?</p>
            <button><Link to={'/Register'}><p className='text-blue-600'>create an account</p></Link></button>
            </div>
            <div className='w-full'>
              <p className='text-xs font-light'>Email</p>
              <input onChange={(e)=>setMail(e.target.value)} className='border-b text-sm border-black w-full outline-none' type="text" />
            </div>
            <div className='w-full flex justify-end'>
            <button onClick={()=>getEmail()} className='px-6 py-2 bg-emerald-500 rounded-lg'>
              <p className='text-white font-semibold'>Continue</p>
            </button>
            </div>
          </div>
          :
          <div className='w-full h-4/5 flex flex-col gap-5 border-b'>
            <p className='font-light'>Step 2 of 2</p>
            <h1 className='text-3xl font-semibold'>Sign In</h1>
            <div className='flex gap-2 items-center'>
              <img className='w-[4vw] h-[6vh] object-cover object-center rounded-full' src={userFinded?.photo} alt="" />
              <div className=''>
                <p className='text-sm font-semibold'>{userFinded?.name} {userFinded?.surname}</p>
                <p className='text-sm'>{userFinded?.email}</p>
              </div>
            </div>
            <div className='w-full'>
              <p className='text-xs font-light'>password</p>
              <div className='border-b text-sm border-black w-full h-6 flex items-center'>
              <input defaultValue={pass} onChange={(e)=>setPass(e.target.value)} className='w-11/12 outline-none h-full' type={`${passwordView?"text":"password"}`} />
              <img onClick={()=>setPasswordView(!passwordView)} className='w-5 h-5 cursor-pointer' src={passwordView?showPassword:notShowPassword} alt="" />
              </div>
            </div>
            <div className='w-full flex justify-end'>
            <button onClick={()=>SignInUser()} className='px-6 py-2 bg-emerald-500 rounded-lg'>
              <p className='text-white font-semibold'>Continue</p>
            </button>
            </div>
          </div>}
          <div className='w-full h-[15vh] flex flex-col items-center justify-end gap-4'>
          <button className='w-5/6 h-fit py-2 border shadow-md  rounded-lg flex items-center justify-center gap-4'>
              <img src={google} alt="" />
              <p>SignIn with Google</p>
            </button>
            <button className='w-5/6 h-fit py-2 shadow-md bg-blue-600 rounded-lg flex items-center justify-center gap-4'>
              <img className='w-6' src={facebook} alt="" />
              <p className='text-white'>SignIn with Facebook</p>
            </button>
          </div>
       </div>


      </div>

    </div>
  )
}

export default SignIn