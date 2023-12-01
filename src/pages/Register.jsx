import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import showPassword from '../assets/showPassword.png'
import notShowPassword from '../assets/notShowPassword.png'
import RegisterVideo from '../assets/RegisterVideo.mp4'
import GoogleLogin from '@stack-pulse/next-google-login'
import google from '../assets/google.png'
const Register = () => {
  const clientID = `1038794978290-vqmqvftrhegrv0ebt2sb92lcmbr1am4u.apps.googleusercontent.com`

  const [data, setData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    date: "",
    photo: undefined
  })
  const [dataError, setDataError] = useState({
    name: false,
    surname: false,
    date: false,
    photo: false,
    email: false,
    password: false,
  })
  const [photoUrl, setPhotoUrl] = useState()
  const [step, setStep] = useState(1)
  const [passwordView, setPasswordView] = useState(false)
  const navigate = useNavigate()

  function getEmailAndPassword() {
    setDataError({
      email: data.email == "" ? dataError.email = true : dataError.email = false,
      password: data.password == "" ? dataError.password = true : dataError.password = false,
    })
    if (dataError.email == true || dataError.password == true) {
      return
    }
    setStep(2)
  }

  async function registerFunction() {
    setDataError({
      name: data.name == "" ? dataError.name = true : dataError.name = false,
      surname: data.surname == "" ? dataError.surname = true : dataError.surname = false,
      date: data.date == "" || data.date > "2005-01-01" ? dataError.date = true : dataError.date = false,
      photo: data.photo == undefined ? dataError.photo = true : dataError.photo = false,
    })
    if (dataError.name == true || dataError.surname == true || dataError.date == true || dataError.photo == true) {
      return
    }
    data.email = data.email.toLowerCase()
    data.name = data.name.charAt(0).toUpperCase() + data.name.slice(1)
    data.surname = data.surname.charAt(0).toUpperCase() + data.surname.slice(1)
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('surname', data.surname)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('photo', data.photo)
    const newUser = axios.post('https://mytinerarybackend-7pod.onrender.com/auth/Register', formData)
    toast.promise(newUser, {
      loading: 'Creating User',
      success: (data) => data.data.message,
      error: (data) => data.response.data.error
    });
    newUser.then(() => {
      setTimeout(() => { navigate('/SignIn') }, 2000)
    })

  }
  function getPhoto(e) {
    setData({ ...data, photo: e.target.files[0] })
    let url = URL.createObjectURL(e.target.files[0])
    setPhotoUrl(url)
  }

  async function onSuccess(response) {

    let userData = {
      name: response.profileObj.givenName,
      surname: response.profileObj.familyName,
      email: response.profileObj.email,
      password: response.profileObj.googleId,
      photo: response.profileObj.imageUrl
    }

    const newUser = axios.post('https://mytinerarybackend-7pod.onrender.com/auth/Register', userData)
    toast.promise(newUser, {
      loading: 'Creating User',
      success: (data) => data.data.message,
      error: (data) => data.response.data.error
    });
    newUser.then(() => {
      setTimeout(() => { navigate('/SignIn') }, 2000)
    })


  }

  const onFailure = () => {
    toast.error("Something went wrong")
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/')
    }

  }, [])

  return (
    <div className='w-screen h-screen flex items-center justify-between'>
      <Toaster position='top-center' />
      <div className='w-1/2 h-full hidden lg:block'>
        <video autoPlay loop muted className='w-full h-full object-cover'>
          <source src={RegisterVideo} />
        </video>
      </div>

      <div className='w-full lg:w-1/2 h-full flex items-end md:items-center justify-center'>
        <div className={`relative w-[90vw] md:w-[60vw] md:mb-0 lg:w-[35vw] xl:w-[30vw] ${step == 1 ? "h-[65vh] mb-[10vh]" : "h-[65vh] mb-[5vh]"} lg:h-[60vh] xl:h-[65vh] rounded-xl flex flex-col items-center px-6 lg:px-10 py-8 justify-around bg-white shadow-xl shadow-black`}>
          {step === 1 ? <>
            <div className='w-full h-4/5 flex flex-col gap-3 xl:gap-5'>
              <p className='font-light'>Step 1 of 2</p>
              <h1 className='text-3xl font-semibold'>Register</h1>
              <div className='flex w-full gap-2'>
                <p>Already have an account?</p>
                <button><Link to={'/SignIn'}><p className='text-blue-600'>Sign In</p></Link></button>
              </div>
              <div className='w-full'>
                <div className='flex justify-between'>
                  <p className='text-sm lg:text-xs font-light'>Email</p>
                  {dataError.email && <p className='text-sm lg:text-xs text-red-600'>* Obligatory field (must have @xxxx.com)</p>}
                </div>
                <input onChange={(e) => setData({ ...data, email: e.target.value })} className='border-b text-sm border-black w-full outline-none' placeholder='email@gmail.com' type="text" defaultValue={data.email} />
              </div>
              <div className='w-full'>
                <div className='flex justify-between'>
                  <p className='text-sm lg:text-xs font-light'>Password</p>
                  {dataError.password && <p className='text-sm lg:text-xs text-red-600'>* Obligatory field</p>}
                </div>
                <div className='border-b text-sm border-black w-full h-6 flex items-center'>
                  <input onChange={(e) => setData({ ...data, password: e.target.value })} className='w-11/12 outline-none h-full' defaultValue={data.password} placeholder='xxxx' type={`${passwordView ? "text" : "password"}`} />
                  <img onClick={() => setPasswordView(!passwordView)} className='w-5 h-5 cursor-pointer' src={passwordView ? showPassword : notShowPassword} alt="" />
                </div>
              </div>
              <div className='w-full flex justify-end'>
                <button onClick={() => getEmailAndPassword()} className='px-6 py-2 bg-[#2dc77f] rounded-lg'>
                  <p className='text-white font-semibold'>Continue</p>
                </button>
              </div>
            </div>
            <div className='w-full h-[8vh] flex flex-col items-center justify-end border-t gap-4'>
              <GoogleLogin render={renderProps =>
                <button onClick={renderProps.onClick} disabled={renderProps.disabled} className='w-full h-fit py-2 border shadow-md  rounded-lg flex items-center justify-center lg:gap-2'>
                  <img src={google} alt="" />
                  <p className='w-3/5 lg:w-4/6 text-sm lg:text-base'>SignUp with Google</p>
                </button>} buttonText='Sign up with google' className='w-full flex justify-center' clientId={clientID} onSuccess={onSuccess} onFailure={onFailure} isSignedIn={true} cookiePolicy={"single_host_policy"} />


            </div>
          </>
            :
            <>
              <div className='w-full h-4/5 flex flex-col justify-center gap-5'>
                <button className='absolute top-5' onClick={() => setStep(1)}>
                  <p className='text-blue-600 text-sm font-extralight'>{'<'} back step 1</p>
                </button>
                <p className='font-light'>Step 2 of 2</p>
                <h1 className='text-3xl font-semibold'>Register</h1>
                <div className='w-full'>
                  <div className='flex justify-between'>
                    <p className='text-sm lg:text-xs font-light'>Name</p>
                    {dataError.name && <p className='text-sm lg:text-xs text-red-600'>* Obligatory field</p>}
                  </div>
                  <input onChange={(e) => setData({ ...data, name: e.target.value })} className={`border-b text-sm ${dataError.name ? "border-red-600" : " border-black"} w-full outline-none`} type="text" defaultValue={data.name} />
                </div>
                <div className='w-full'>
                  <div className='flex justify-between'>
                    <p className='text-sm lg:text-xs font-light'>Surname</p>
                    {dataError.surname && <p className='text-sm lg:text-xs text-red-600'>* Obligatory field</p>}
                  </div>
                  <input onChange={(e) => setData({ ...data, surname: e.target.value })} className={`border-b text-sm ${dataError.surname ? "border-red-600" : " border-black"} w-full outline-none`} type="text" defaultValue={data.surname} />
                </div>
                <div className='w-full'>
                  <div className='flex justify-between'>
                    <p className='text-sm lg:text-xs font-light'>Date</p>
                    {dataError.date && <p className='text-sm lg:text-xs text-red-600'>* Obligatory field (18+)</p>}
                  </div>
                  <input onChange={(e) => setData({ ...data, date: e.target.value })} className={`border-b text-sm ${dataError.date ? "border-red-600" : " border-black"} w-full outline-none`} type="date" defaultValue={data.date} />
                </div>
                <div className='w-full flex flex-col gap-1'>
                  <div className='flex justify-between'>
                    <p className='text-sm lg:text-xs font-light'>Photo</p>
                    {dataError.photo && <p className='text-sm lg:text-xs text-red-600'>* Obligatory field</p>}
                  </div>
                  {photoUrl ?
                    <div className='w-[8vw] h-[10vh] relative'>
                      <img className='w-full h-full object-cover rounded-full' src={photoUrl} alt="" />
                      <div className='absolute top-[30%] left-0 flex items-center justify-center rounded-xl w-full h-2/5 bg-[#00000082] opacity-0 hover:opacity-100'>
                        <p className='text-white font-semibold'>Change</p>
                        <input onChange={(e) => getPhoto(e)} className={`text-sm absolute h-full w-full opacity-0 `} type="file" />
                      </div>

                    </div>
                    :
                    <input onChange={(e) => getPhoto(e)} accept='.jpeg,.png,.jpg' className={`text-sm w-full ${dataError.photo ? "text-red-600" : " text-black"} `} type="file" />
                  }                </div>
                <div className='w-full flex justify-end'>
                  <button onClick={() => registerFunction()} className='lg:px-6 lg:py-2 px-4 py-1 bg-[#2dc77f] rounded-lg'>
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