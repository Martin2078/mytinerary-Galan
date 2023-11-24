import React, { useState } from 'react'
import google from '../assets/google.png'
import facebook from '../assets/facebook.png'
import showPassword from '../assets/showPassword.png'
import notShowPassword from '../assets/notShowPassword.png'
import closeBlack from '../assets/closeBlack.png'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import profile from '../redux/actions/userAction'
import { useDispatch } from 'react-redux'

const SignInEmergent = ({ setLogged }) => {
    const dispatch = useDispatch()
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })
    const [passwordView, setPasswordView] = useState(false)


    async function SignInUser(e) {
        e.preventDefault()
        setUserData({ ...userData, email: userData.email.toLowerCase() })
        const response = axios.post('http://localhost:8080/auth/SignIn', userData)
        toast.promise(response, {
            loading: 'Getting user',
            success: (data) => data.data.message,
            error: (data) => data.response.data.error
        });
        response.then((res) => {
            localStorage.setItem("token", res.data.response.token)
            localStorage.setItem("user", JSON.stringify(res.data.response.userFinded))
            localStorage.setItem("favorites", JSON.stringify(res.data.response.userFinded.favorites))
            dispatch(profile.logIn(res.data.response))
            setTimeout(() => {
                setLogged(false)
            }, 1000)
        })
    }

    return (
        <div className='absolute top-0 left-0 w-screen h-screen bg-[#0000003b] flex items-center justify-center z-50'>
            <Toaster position='top-center' />
            <div className='w-2/6 h-3/5 relative bg-white rounded-xl z-50 flex flex-col items-center justify-between px-10 py-5 pb-10'>
                <button onClick={() => setLogged(false)} className='absolute top-3 right-3'><img className='w-4' src={closeBlack} alt="" /></button>
                <h1 className='text-4xl font-semibold'>Sign In</h1>


                <form onSubmit={SignInUser} className='w-full h-3/5 flex flex-col items-center justify-evenly'>
                    <div className='w-full'>
                        <label htmlFor="">Email</label>
                        <input placeholder='@xxxx.com' onChange={(e) => setUserData({ ...userData, email: e.target.value })} className='border-b text-sm border-black w-full h-[4vh] outline-none' type="text" />
                    </div>

                    <div className='w-full'>
                        <label htmlFor="">Password</label>
                        <div className='border-b text-sm border-black w-full h-[4vh] flex items-center'>
                            <input onChange={(e) => setUserData({ ...userData, password: e.target.value })} className='w-11/12 outline-none h-full ' type={`${passwordView ? "text" : "password"}`} />
                            <img onClick={() => setPasswordView(!passwordView)} className='w-5 h-5 cursor-pointer' src={passwordView ? showPassword : notShowPassword} alt="" />
                        </div>
                    </div>
                    <div className='w-full flex justify-end'>
                        <button className='bg-[#2dc77f] rounded-lg'><p className='px-5 py-1 text-white font-semibold text-xl'>Sign In</p></button>
                    </div>

                </form>
                <div className='w-4/5 lg:h-1/5 h-[18vh]  flex flex-col items-center justify-end gap-4'>
                    <button className='w-full h-fit py-2 border shadow-md  rounded-lg flex items-center justify-center lg:gap-2'>
                        <img src={google} alt="" />
                        <p className='w-3/5 text-sm lg:text-base lg:w-4/6'>SignIn with Google</p>
                    </button>
                    <button className='w-full h-fit py-2 shadow-md bg-blue-600 rounded-lg flex items-center justify-center lg:gap-2'>
                        <img className='w-6' src={facebook} alt="" />
                        <p className='text-white w-3/5 lg:w-4/6 text-sm lg:text-base'>SignIn with Facebook</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SignInEmergent