import React, { useEffect, useState } from 'react'
import { Link, useMatch, useNavigate } from 'react-router-dom'
import SignInIcon from '../assets/SignInIcon.png'
import profile from '../redux/actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import logOut from '../assets/logOut.png'
import signIn from '../assets/signIn.png'
import logOutAction from '../redux/actions/logOutAction'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'


const Header = () => {
  const home = useMatch('/')
  const cities = useMatch('/Cities')
  const dispatch = useDispatch()
  const { token, user } = useSelector(store => store.profileReducer)
  const [open, setOpen] = useState(false)
  const navigate=useNavigate()

  function DropdownItem({ img, text,link }) {
    return (
      <Link to={link}>
      <li className='flex gap-2 items-center'>
        <img className='h-5' src={img} alt="" />
        <p className='font-semibold'>{text}</p>
      </li>
      </Link>
    )
  }

  async function LogOutFunction() {
    let headers = { headers: { 'Authorization': `Bearer ${token}` } }
    const response = await axios.post('http://localhost:8080/auth/SignOut',null,headers)
    toast.success(response.data.message)
    dispatch(logOutAction())
    localStorage.clear()
    navigate('/')
  }

  useEffect(() => {
    if (!token) {
      const tokenStorage = localStorage.getItem('token')
      if (tokenStorage) {
        const userStorage = JSON.parse(localStorage.getItem('user'))
        const objeto = {
          token: tokenStorage,
          userFinded: userStorage
        }
        dispatch(profile(objeto))
      }
    }else{
      navigate('/')
    }
  }, [token])

  return (
    <div className='w-screen h-[6vh] z-10 bg-[#000000a4] fixed top-0 py-2 px-28 flex justify-between items-center'>
      <Toaster position='top-center'/>
      <Link className='cursor-pointer' to={'/'}><h1 className='text-2xl font-semibold text-white'>MyTinerary</h1></Link>
      <div className='flex items-center justify-center gap-5'>
        <Link to={"/"}><p className={`${home != null ? "text-blue-400" : "text-white"}`}>Home</p></Link>
        <Link to={"/Cities"}><p className={`${cities != null ? "text-blue-500" : "text-white"}`}>Cities</p></Link>
        {token ?
          <button onClick={() => setOpen(!open)}>
            <img className='h-[4vh] w-[3vw] object-cover object-center rounded-full' src={user.photo} alt="" />
            {open && <div className='w-[10vw] -translate-x-24 h-[16vh] bg-white rounded-xl absolute flex flex-col items-center py-2 px-4'>
              <ul className='list-none flex flex-col justify-evenly h-full'>
                <DropdownItem img={logOut} text={"Itineraries"} />
                <DropdownItem img={signIn} text={"Profile"} link={"/Cities"} />
                <button onClick={()=>LogOutFunction()}><DropdownItem img={logOut} text={"Log Out"} /></button>
              </ul>
            </div>}
          </button>
          :
          <button className='w-20 h-8 py-1 px-2 rounded-xl bg-emerald-500'>
            <Link className='flex items-center justify-center gap-1' to={"/SignIn"}>
              <img className='w-4 h-4' src={SignInIcon} alt="" />
              <p className='text-white'>Login</p>
            </Link>
          </button>}
      </div>
    </div>
  )
}

export default Header