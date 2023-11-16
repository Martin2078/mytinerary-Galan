import React, { useEffect, useState } from 'react'
import notPhotos from '../assets/notPhotos.png'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
const CommentForm = () => {
  const { token,user }=useSelector((store)=>store.profileReducer)
  const { id } = useParams()
  const [commentError,setCommentError]=useState({
    title: false,
    text: false,
    valoration: false,
  })

  let valoration = [{
    value: 1,
    textValue: "Very Bad"
  },
  {
    value: 2,
    textValue: "Bad"
  },
  {
    value: 3,
    textValue: "Good"
  },
  {
    value: 4,
    textValue: "Very Good"
  },
  {
    value: 5,
    textValue: "Excellent"
  }]
  const [itineraryData, setItineraryData] = useState()
  const [commentData, setCommentData] = useState({
    title: "",
    text: "",
    photo: [],
    valoration: {
      value:undefined,
      textValue:undefined},
    itineraryId: id,
    userId:undefined
  })
  const [rating, setRating] = useState()

  async function createComment(e) {
    e.preventDefault()
    if (commentData.valoration.value==undefined) {
      console.log("no hay");
    }
    if (commentData.title=="") {
      setCommentError({...commentError,title:true})
    }else{
      setCommentError({...commentError,title:false})
    }
    if (commentData.text=="") {
      setCommentError({...commentError,text:true})
    }else{
      setCommentError({...commentError,text:false})
    }
    console.log(commentError);
    console.log(commentData);
    let esdad=commentError.filter((key)=>{if (key==true) {
      return key
    }})
    console.log(esdad);
    setCommentData({...commentData,userId:user._id})
    
  }

  async function getItinerary() {
    let response = await axios.get(`http://localhost:8080/itineraries/one/${id}`)
    setItineraryData(response.data.response)
  }

  useEffect(() => {

  }, [commentError])
  useEffect(() => {
    getItinerary()
  }, [])

  return (
    <div className='w-screen h-screen flex'>
      <div className='w-4/12 h-full flex flex-col items-center justify-center px-10'>
        <div className='w-full h-4/6 flex flex-col items-center justify-center border-r gap-10'>
          <h1 className='text-center text-4xl font-semibold'>Tell us your experience in:</h1>
          <div className='w-5/6 h-[40vh] border py-2 px-2 flex flex-col items-center gap-4 rounded-xl'>
            <p className='text-2xl font-semibold'>{itineraryData?.title}</p>
            <img className='w-full rounded-xl' src={itineraryData?.photo} alt="" />
            <div className='w-full px-4 flex flex-col gap-1'>
              <p className='text-xl'>From:</p>
              <div className='flex items-start gap-2'>
                <img className='h-auto lg:h-[4vh] w-[10vw] lg:w-[3vw] object-cover object-center rounded-full' src={itineraryData?.userId.photo} alt="" />
                <p className='font-semibold'>{itineraryData?.userId.name} {itineraryData?.userId.surname}</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className='w-8/12 h-full overflow-y-auto pt-[10vh]'>
        <form onSubmit={(e)=>createComment(e)} className='flex flex-col gap-6' action="">

        <div className='w-8/12 flex flex-col gap-4'>
            <p className='font-semibold text-xl'>Value your experience</p>
            <div className='flex items-center w-8/12'>
              <div className='flex gap-2 w-4/6 '>
                {valoration.map((val, index) => {
                  return <span onClick={() => setCommentData({...commentData,valoration:{value:val.value,textValue:val.textValue}})} className={`w-10 h-10 rounded-full border border-black ${val.value <= commentData.valoration.value ? "bg-[#2dc77f]" : "bg-[white]"} hover:bg-[#2dc77f]`}></span>
                })}
              </div>
              <p className='font-semibold'>{commentData.valoration.value == undefined ? "" : commentData?.valoration.textValue}</p>
            </div>
          </div>

          <fieldset className='flex flex-col gap-4'>
            <label className='font-semibold text-xl'>Title</label>
            <input onChange={(e) => setCommentData({ ...commentData, title: e.target.value })} type="text" min={4} max={100} className={`border ${commentError.title&&"border-red-600"} w-8/12 px-2 py-2 rounded-lg`} placeholder='Write a title for your experience' />
            <div className='w-8/12 flex justify-end'>
              <p className='font-light text-sm'>0 of 80 characters maximum</p>
            </div>
          </fieldset>

          <fieldset className='flex flex-col gap-4'>
            <label className='font-semibold text-xl'>Message</label>
            <textarea onChange={(e) => setCommentData({ ...commentData, text: e.target.value })} placeholder='The restaurant was so good...' name="" id="" className={`w-8/12 h-[20vh] border ${commentError.text&&"border-red-600"} px-2 py-1 resize-none rounded-lg`}></textarea>
            <div className='w-8/12 flex justify-end'>
              <p className='font-light text-sm'>0 of 100 characters minimum</p>
            </div>
          </fieldset>


          <div className='flex flex-col gap-4'>
            <p className='text-xl font-semibold'>Photo</p>
            <div className='bg-gray-100 relative w-8/12 h-[20vh] border flex items-center justify-center rounded-lg'>
              <input className='w-full h-full opacity-0 z-10' type="file" multiple />
              <div className='flex flex-col items-center justify-center absolute z-0'>
                <p className=''>Upload one or more photos!</p>
                <p>press or drag and drop them</p>
                <img className='w-[8vh]' src={notPhotos} alt="" />
              </div>

            </div>
          </div>

          <div className='w-8/12 h-[10vh] flex items-center justify-start px-2 '>
              <button className='bg-[#2dc77f] rounded-lg w-1/3 hover:scale-105'><p className='text-xl px-2 py-1  text-white font-semibold'>Comment</p></button>
          </div>
          

        </form>
      </div>
    </div>
  )
}

export default CommentForm