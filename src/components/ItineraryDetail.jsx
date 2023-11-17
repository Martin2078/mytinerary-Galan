import closeBlack from '../assets/closeBlack.png'
import Carrousel from './Carrousel.jsx'
import notFavorite from '../assets/notFavorite.png'
import notComments from '../assets/notComments.png'
import Description from './Description.jsx'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import SignInEmergent from './SignInEmergent.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'
import CommentAuthor from './CommentAuthor.jsx'
import CommentNotAuthor from './CommentNotAuthor.jsx'


const ItineraryDetail = ({ token, user, dataItinerary, setCityDetails }) => {

    console.log(user);
    const navigate = useNavigate()
    const [logged,setLogged]=useState()


    function redirect() {
        if (!token) {
            toast.error('You must be logged to comment!')
            setLogged(true)
        } else {
            navigate(`/CommentForm/${dataItinerary._id}`)
        }
    }

    async function getComments() {
        let response=await axios.get(`http://localhost:8080/comments/${dataItinerary._id}`)
        dataItinerary.comments=response.data.response
    }
    useEffect(()=>{
        getComments()
    },[])
    return (
        <div className='fixed top-0 left-0 w-screen h-screen bg-[#0000003b] flex justify-end z-30'>
            <Toaster position='top-center' />
            {logged&&<SignInEmergent setLogged={setLogged}/>}
            <div className='max-w-[35vw] min-h-screen overflow-y-scroll px-1 bg-white animationMyItinerary relative rounded-l-2xl flex flex-col items-center'>
                <div className='w-full min-h-[6vh] flex justify-end px-2'>
                    <button onClick={() => setCityDetails(false)}><img className='w-5' src={closeBlack} alt="" /></button>
                </div>

                <div className='w-full h-full flex flex-col'>
                    <img className='h-[35vh] w-full object-cover rounded-xl' src={dataItinerary?.photo} alt="" />
                    <div className='w-full px-5 flex flex-col gap-2 py-4  pb-12'>
                        <h1 className='text-3xl font-semibold'>{dataItinerary?.title}</h1>
                        <div className='w-full flex items-center gap-2'>
                            <img className='w-4' src={notFavorite} alt="" />
                            <p>{dataItinerary?.likes}</p>
                        </div>
                        <div className='w-full flex items-center gap-2'>
                            <p className='font-semibold text-xl'>Price:</p>
                            <p className='text-lg'>{dataItinerary?.price.map((bill, index) => {
                                const template = []
                                for (let i = 0; i < bill; i++) {
                                    template.push("$")
                                }
                                if (index == 0) {
                                    template.push("-")
                                }
                                return template
                            })}</p>
                        </div>
                        <div className='w-full flex items-end gap-2'>
                            <p className='font-semibold text-xl'>Aproximated duration:</p>
                            <p>{dataItinerary?.duration} minutes</p>
                        </div>
                        <p>{dataItinerary?.hashtags.map((hash) => {
                            return `${hash} `
                        })}</p>
                    </div>
                </div>

                <div className='w-full px-5 py-5 pb-10 border-y flex flex-col gap-5'>
                    <h2 className='text-2xl font-semibold'>Activities</h2>
                    <div className='w-full flex flex-col items-center gap-5 px-5'>
                        {dataItinerary?.activities.map((activity) => {
                            return <div className='w-full flex flex-col gap-2'>
                                <Carrousel data={activity.photo} classes={'h-[20vh] w-full rounded-xl object-cover'} buttonsClasses={'hidden'} />
                                <h3 className='text-2xl font-semibold'>{activity.name}</h3>
                                <p className='text-zinc-400'>{activity.ubication}</p>
                                <Description info={activity.description} amountCharacters={130} />
                            </div>
                        })}
                    </div>
                </div>

                <div className='w-full px-5 py-5 flex flex-col gap-5'>
                    <h2 className='font-semibold text-2xl'>Comments</h2>
                    <button onClick={() => redirect()} className='border w-fit rounded-xl bg-[#2dc77f]'><p className='text-white text-lg font-semibold px-3 py-1'>Write a opinion</p></button>
                    {dataItinerary.comments?.length < 1
                        ?
                        <div className='w-full h-[25vh] flex flex-col items-center py-2 px-2'>
                            <p className='text-xl font-semibold'>There is no comments yet</p>
                            <p className='font-semibold'>Be the first in share your opinion</p>
                            <img className='w-full h-3/4 object-contain mt-2 rounded-xl' src={notComments} alt="" />
                        </div>
                        :
                        <div className='w-full flex flex-col gap-2'>
                            {user==null?
                            dataItinerary.comments?.map((comment)=>{
                                return <CommentNotAuthor/>
                             })
                            :
                            dataItinerary.comments?.map((comment)=>{
                               if (comment.userId._id==user._id) {
                                return <CommentAuthor/>
                               }
                               return <CommentNotAuthor/>
                            })}
                        </div>
                    }

                </div>


            </div>

        </div>
    )
}

export default ItineraryDetail