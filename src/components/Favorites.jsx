import React, { useEffect } from 'react'
import closeBlack from '../assets/closeBlack.png'
import { useDispatch, useSelector } from 'react-redux'
import notFavorites from '../assets/backgroundImage4.jpg'
import close from '../assets/close.png'
import '../style.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import profile from '../redux/actions/userAction'
const Favorites = ({ setOpenFavorites,toast,token }) => {
  const dispatch = useDispatch()
  const favorites = useSelector((store) => store.profileReducer.favorites)

async function deleteFromFavorite(id) {
    let headers = { headers: { 'Authorization': `Bearer ${token}` } }
    let response = axios.delete(`http://localhost:8080/auth/favorites/${id}`, headers)
    toast.promise(response, {
        loading: 'Unsaving',
        success: (data) => data.data.message,
        error: (data) => data.response.data.error
    });
    response.then((res) => {
        localStorage.setItem('favorites', JSON.stringify(res.data.response))
        dispatch(profile.deleteFavorite(res.data.response))
    })

}

useEffect(()=>{

},[favorites])
  return (
    <div className='w-full h-screen fixed top-0 right-0 z-50 flex justify-end bg-[#0000003b]'>
      <div className='w-1/3 h-screen bg-white rounded-l-xl relative px-4 py-2 flex flex-col gap-5 animationMyItinerary'>
        <button className='absolute top-4 right-4' onClick={() => setOpenFavorites(false)}>
          <img src={closeBlack} alt="" />
        </button>
        <h1 className='text-4xl font-semibold'>Favorites</h1>
        <div className='w-full h-full flex flex-col overflow-y-auto gap-5'>
          {favorites.length > 0 ? favorites.map((favorite) => {
            return <div className='w-full h-[25vh] relative '>
              <img className='w-full h-full object-cover rounded-xl' src={favorite.photo} alt="" />
              <div className='w-full h-full absolute bottom-0 left-0 px-3 flex flex-col gap-2 py-2 bg-[#3b3b3bae] opacity-0 hover:opacity-100 rounded-xl'>
              <button onClick={()=>deleteFromFavorite(favorite._id)} className='absolute top-3 right-3'><img src={close} alt="" /></button>
                <p className='text-2xl text-white font-semibold'>{favorite.title}</p>
                <p className='text-lg text-[#e4e4e4]'>{favorite?.price.map((bill, index) => {
                  const template = []
                  for (let i = 0; i < bill; i++) {
                    template.push("$")
                  }
                  if (index == 0 && favorite.price.length > 1) {
                    template.push("-")
                  }
                  return template
                })}</p>
                <div className='w-full flex items-end gap-2'>
                  <p className='font-semibold text-base lg:text-xl text-[#e4e4e4]'>Aproximated duration:</p>
                  <p className='text-[#e4e4e4]'>{favorite.duration} minutes</p>
                </div>
                <p className='text-[#e4e4e4]'>{favorite.hashtags.map((hash) => {
                            return `${hash} `
                        })}</p>
              </div>
            </div>
          }) :
            <div className='w-full h-[60vh] flex flex-col items-center justify-center gap-5'>
              <img className='w-full h-2/5 object-cover rounded-xl' src={notFavorites} alt="" />
              <div className='flex flex-col w-full items-center gap-2 '>
                <p className='text-2xl font-semibold'>There is no favorites yet</p>
                <Link to={"/Cities"}><button onClick={() => setOpenFavorites(false)} className='px-4 py-2 border rounded-xl bg-[#2dc77f] text-white text-xl font-semibold'>Go to Cities!</button></Link>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Favorites