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
import save from '../assets/save.png'
import notSave from '../assets/notSave.png'


const ItineraryDetail = ({ token, user, dataItinerary,setDataItinerary, setCityDetails }) => {

    const navigate = useNavigate()
    const [logged, setLogged] = useState()
    const [averageValoration, setAverageValoration] = useState(0)
    const [render, setRender] = useState(false)
    function averageRating(data) {
        let acum = 0
        for (let i = 0; i < data.length; i++) {
            acum += data[i].valoration.value
        }
        let average = (acum / data.length)
        setAverageValoration(average)
    }

    function valorationCircles() {
        let template = []
        for (let i = 0; i < 5; i++) {
            template.push(<span className={`w-5 h-5 rounded-full border border-[#2dc77f] ${i < averageValoration && "bg-[#2dc77f]"}`}></span>)
        }
        return template
    }

    function redirect() {
        if (!token) {
            toast.error('You must be logged to comment!')
            setLogged(true)
        } else {
            navigate(`/CommentForm/${dataItinerary._id}`)
        }
    }

    async function getComments() {
        let response = await axios.get(`http://localhost:8080/comments/${dataItinerary._id}`)
        setDataItinerary({...dataItinerary,comments:response.data.response})
        averageRating(response.data.response)    
    }
    useEffect(() => {
        getComments()
    }, [render])


    return (
        <div className='fixed top-0 left-0 w-screen h-screen bg-[#0000003b] flex justify-end z-30'>
            <Toaster position='top-center' />
            {logged && <SignInEmergent setLogged={setLogged} />}
            <div className='max-w-[35vw] min-h-screen overflow-y-scroll px-1 bg-white animationMyItinerary relative rounded-l-2xl flex flex-col items-center'>
                <div className='w-full min-h-[6vh] flex justify-end px-2'>
                    <button onClick={() => setCityDetails(false)}><img className='w-5' src={closeBlack} alt="" /></button>
                </div>

                <div className='w-full h-full flex flex-col'>
                    <img className='h-[35vh] w-full object-cover rounded-xl' src={dataItinerary?.photo} alt="" />
                    <div className='w-full px-5 flex flex-col gap-2 py-4  pb-8'>
                        <h1 className='text-3xl font-semibold'>{dataItinerary?.title}</h1>
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
                        <div className='w-full h-10'>
                            <button className='w-3/12 h-full border-2 hover:bg-[#2dc77f] border-[#2dc77f] rounded-xl flex items-center justify-center gap-2'>
                                <img src={notSave} alt="" />
                                <p className='text-xl font-semibold text-black'>Save</p>
                            </button>
                        </div>
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
                    {dataItinerary.comments?.length > 0 &&
                        <div className='w-full h-[2vh] flex items-center gap-2'>
                            <div className='flex gap-2 items-center'>
                                <p className='text-2xl font-semibold'>{averageValoration}</p>
                                <div className='flex gap-1 items-center'>
                                    {valorationCircles()}
                                </div>
                            </div>
                            <p className='text-sm font-thin'>of {dataItinerary.comments?.length} travelers</p>
                        </div>

                    }
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
                            {user == null ?
                                dataItinerary.comments?.map((comment) => {
                                    return <CommentNotAuthor setRender={setRender} comment={comment} setLogged={setLogged} user={user} token={token} />
                                })
                                :
                                dataItinerary.comments?.map((comment) => {
                                    if (comment.userId._id == user._id) {
                                        return <CommentAuthor comment={comment} setRender={setRender} user={user} token={token} />
                                    }
                                    return <CommentNotAuthor setRender={setRender} comment={comment}  setLogged={setLogged} user={user} token={token} />
                                })}
                        </div>
                    }

                </div>


            </div>

        </div>
    )
}

export default ItineraryDetail