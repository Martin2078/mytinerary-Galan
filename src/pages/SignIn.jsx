import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import profile from '../redux/actions/userAction'
import toast, { Toaster } from 'react-hot-toast'
import showPassword from '../assets/showPassword.png'
import notShowPassword from '../assets/notShowPassword.png'
import facebook from '../assets/facebook.png'
import SignInVideo from '../assets/SignInVideo.mp4'
import {GoogleLogin , GoogleOAuthProvider} from '@react-oauth/google'


const SignIn = () => {
  const clientID=`1038794978290-vqmqvftrhegrv0ebt2sb92lcmbr1am4u.apps.googleusercontent.com`
  const [mail, setMail] = useState("")
  const [pass, setPass] = useState("")
  const [userFinded, setUserFinded] = useState({})
  const [step, setStep] = useState(1)
  const dispatch = useDispatch()
  const { token, user, } = useSelector(store => store.profileReducer)
  const [passwordView, setPasswordView] = useState(false)
  const navigate = useNavigate()


  async function getEmail() {
    setMail(mail.toLowerCase())
    const email = mail.toLowerCase()
    const finded = axios.get(`http://localhost:8080/auth?email=${email}`)
    toast.promise(finded, {
      loading: 'Loading',
      success: (data) => data.data.message,
      error:(data)=> data.response.data.error
    });
    finded.then((res)=>{
      if (res.data.success==true) {
        setStep(2)
        setUserFinded(res.data.response[0])
      }
    })
  }
  const onSuccess=(res)=>{
    console.log(res);
    // const objeto = {
    //   email: res.profileObj.email,
    //   password: res.profileObj.googleId
    // }
    // const response = axios.post('http://localhost:8080/auth/SignIn', objeto)
    // toast.promise(response, {
    //   loading: 'Getting user',
    //   success: (data) => data.data.message,
    //   error:(data)=> data.response.data.error
    // });
    // response.then((res)=>{
    //   localStorage.setItem("token", res.data.response.token)
    //   localStorage.setItem("user", JSON.stringify(res.data.response.userFinded))
    //   localStorage.setItem("favorites", JSON.stringify(res.data.response.userFinded.favorites))
    //   dispatch(profile.logIn(res.data.response))
    //   setTimeout(() => {
    //     navigate('/')
    //   }, 2000)
    // })
  }
  const onFailure=()=>{
    toast.error("Something went wrong")
  }
  async function SignInUser() {
    const objeto = {
      email: mail,
      password: pass
    }
    const response = axios.post('http://localhost:8080/auth/SignIn', objeto)
    toast.promise(response, {
      loading: 'Getting user',
      success: (data) => data.data.message,
      error:(data)=> data.response.data.error
    });
    response.then((res)=>{
      localStorage.setItem("token", res.data.response.token)
      localStorage.setItem("user", JSON.stringify(res.data.response.userFinded))
      localStorage.setItem("favorites", JSON.stringify(res.data.response.userFinded.favorites))
      dispatch(profile.logIn(res.data.response))
      setTimeout(() => {
        navigate('/')
      }, 2000)
    })
    
  }

  useEffect(()=>{
    if (localStorage.getItem('token')) {
      navigate('/')
    }
    // const start=()=>{
    //   gapi.client.init({
    //     clientId:clientID,
    //     scope:""})
    // }
    // gapi.load("client:auth2",start)
  },[])

  return (
    <div className='w-screen h-screen flex items-center justify-between'>
      <Toaster position='top-center' />
      <div className='w-1/2 h-full hidden lg:block'>
        <video autoPlay loop muted className='w-full h-full object-cover'>
          <source src={SignInVideo} />
        </video>
      </div>

      <div className='w-full lg:w-1/2 h-full flex items-end md:items-center justify-center'>
        <div className={`w-[90vw] md:w-[60vw]  md:mb-0 lg:w-[35vw] xl:w-[30vw] ${step==1?"h-[60vh] mb-[10vh]":"h-[70vh] mb-[5vh]"} lg:h-[65vh] rounded-xl flex flex-col items-center px-6 lg:px-10 py-8 justify-around bg-white shadow-xl shadow-black`}>
          {step == 1
            ?
            <div className='w-full h-4/5 flex flex-col gap-5'>
              <p className='font-light'>Step 1 of 2</p>
              <h1 className='text-3xl font-semibold'>Sign In</h1>
              <div className='flex w-full gap-1 lg:gap-2'>
                <p>New User?</p>
                <button><Link to={'/Register'}><p className='text-blue-600'>create an account</p></Link></button>
              </div>
              <div className='w-full'>
                <p className='text-xs font-light'>Email</p>
                <input onChange={(e) => setMail(e.target.value)} className='border-b text-sm border-black w-full outline-none' type="text" />
              </div>
              <div className='w-full flex justify-end'>
                <button onClick={() => getEmail()} className='lg:px-6 lg:py-2 px-4 py-1 bg-[#2dc77f] rounded-lg'>
                  <p className='text-white font-semibold'>Continue</p>
                </button>
              </div>
            </div>
            :
            <div className='w-full h-4/5 flex flex-col gap-5'>
              <p className='font-light'>Step 2 of 2</p>
              <h1 className='text-3xl font-semibold'>Sign In</h1>
              <div className='flex gap-2 items-center'>
                <img className='w-[18vw] h-[8vh] min-[425px]:h-[10vh] md:w-[10vw]  lg:w-[5vw] lg:h-[5vh] xl:h-[7vh] object-cover object-center rounded-full' src={userFinded?.photo} alt="" />
                <div className=''>
                  <p className='text-sm font-semibold'>{userFinded?.name} {userFinded?.surname}</p>
                  <p className='text-sm'>{userFinded?.email}</p>
                </div>
              </div>
              <div className='w-full'>
                <p className='text-sm lg:text-xs font-light'>password</p>
                <div className='border-b text-sm border-black w-full h-6 flex items-center'>
                  <input defaultValue={pass} onChange={(e) => setPass(e.target.value)} className='w-11/12 outline-none h-full' type={`${passwordView ? "text" : "password"}`} />
                  <img onClick={() => setPasswordView(!passwordView)} className='w-5 h-5 cursor-pointer' src={passwordView ? showPassword : notShowPassword} alt="" />
                </div>
              </div>
              <div className='w-full flex justify-end'>
                <button onClick={() => SignInUser()} className='px-6 py-2 bg-[#2dc77f] rounded-lg'>
                  <p className='text-white font-semibold'>Continue</p>
                </button>
              </div>
            </div>}
          <div className='w-full lg:h-[15vh] h-[18vh]  flex flex-col items-center justify-end gap-4'>
            <GoogleOAuthProvider clientId={clientID}>
            <GoogleLogin onSuccess={onSuccess}  onError={onFailure} cookiePolicy={'single_host_policy'} />
            </GoogleOAuthProvider>
            <button className='w-full h-fit py-2 shadow-md bg-blue-600 rounded-lg flex items-center justify-center lg:gap-2'>
              <img className='w-6' src={facebook} alt="" />
              <p className='text-white w-3/5 lg:w-4/6 text-sm lg:text-base'>SignIn with Facebook</p>
            </button>
          </div>
        </div>


      </div>

    </div>
  )
}

export default SignIn