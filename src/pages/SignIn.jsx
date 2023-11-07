import React, { useEffect, useRef, useState } from 'react'
import signInBackground from '../assets/signInBackground2.jpg'
import google from '../assets/google.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import profile from '../redux/actions/userAction'

const SignIn = () => {
  const email=useRef()
  const [mail,setMail]=useState()
  const [pass,setPass]=useState()
  const [userFinded,setUserFinded]=useState({})
  const dispatch=useDispatch()
  const {token,user}=useSelector(store=>store.profileReducer)
  const navigate=useNavigate()


  async function getEmail() {
    const finded=await axios.get(`http://localhost:8080/auth?email=${mail}`)
    console.log(finded);
    setUserFinded(finded.data.response[0])
    email.current.value=""
  }
  async function SignInUser() {
    const objeto={
      email:mail,
      password:pass
    }
    const response = await axios.post('http://localhost:8080/auth/SignIn',objeto)
    localStorage.setItem("token",response.data.response.token)
    localStorage.setItem("user",JSON.stringify(response.data.response.userFinded))
    dispatch(profile(response.data.response))
  }
  useEffect(()=>{
    if (!token ) {
      const tokenStorage=localStorage.getItem('token')
      if (tokenStorage) {
        const userStorage=JSON.parse(localStorage.getItem('user'))
        const objeto={
          token:tokenStorage,
          userFinded:userStorage
        }
        dispatch(profile(objeto))
      }
    }else{
      navigate('/')
    }
  },[userFinded,token])
  return (
    <div className='w-screen h-screen flex items-center justify-between'>
      <div className='w-1/2 h-full' style={{ backgroundImage: `url(${signInBackground})`, backgroundSize: 'contain' }}>

      </div>
      
      <div className='w-1/2 h-full flex items-center justify-center'>
       <div className='w-[30vw] h-[60vh] border rounded-xl flex flex-col items-center px-10 py-8 justify-around bg-white shadow-xl shadow-black'>
          {!userFinded.email
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
              <input ref={email} onChange={(e)=>setMail(e.target.value)} className='border-b text-sm border-black w-full outline-none' type="text" />
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
              <img className='h-[5vh]' src={userFinded?.photo} alt="" />
              <div className=''>
                <p className='text-sm font-semibold'>{userFinded?.name} {userFinded?.surname}</p>
                <p className='text-sm'>{userFinded?.email}</p>
              </div>
            </div>
            <div className='w-full'>
              <p className='text-xs font-light'>password</p>
              <input onChange={(e)=>setPass(e.target.value)} className='border-b text-sm border-black w-full outline-none' type="password" />
            </div>
            <div className='w-full flex justify-end'>
            <button onClick={()=>SignInUser()} className='px-6 py-2 bg-emerald-500 rounded-lg'>
              <p className='text-white font-semibold'>Continue</p>
            </button>
            </div>
          </div>}
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
       </div>


      </div>

    </div>
  )
}

export default SignIn