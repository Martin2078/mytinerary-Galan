import React, { useEffect, useState } from 'react'
import notPhotos from '../assets/notPhotos.png'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
const CommentForm = () => {
  const { token, user } = useSelector((store) => store.profileReducer)
  const { id,top } = useParams()
  const navigate = useNavigate()
  const [commentError, setCommentError] = useState({
    title: false,
    text: false,
    valoration: false,
  })
  const [urlPhotos, setUrlPhotos] = useState([])
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
      value: undefined,
      textValue: undefined
    },
    itineraryId: id,
    userId:user._id
  })

  async function createComment(e) {
    e.preventDefault()

    setCommentError({
      title: commentData.title === "" ? commentError.title = true : commentError.title = false,
      text: commentData.text === "" || commentData.text.length < 100 ? commentError.text = true : commentError.text = false,
      valoration: commentData.valoration.value === undefined ? commentError.valoration = true : commentError.valoration = false
    });

    if (commentError.text == true || commentError.title == true || commentError.valoration == true) {
      return
    }

    const formData = new FormData()
    formData.append('text', commentData.text)
    formData.append('title', commentData.title)
    formData.append('userId',commentData.userId)
    formData.append('itineraryId', commentData.itineraryId)
    formData.append('valorationValue', commentData.valoration.value)
    formData.append('valorationTextValue', commentData.valoration.textValue)
    commentData.photo.forEach((img)=>{
      formData.append(`photo`,img)
    })
    let headers = { headers: { 'Authorization': `Bearer ${token}` } }
    let response = axios.post('https://mytinerarybackend-7pod.onrender.com/comments',formData,headers)
    toast.promise(response, {
      loading: 'Posting comment',
      success: (data) => data.data.message,
      error:(data)=> data.response.data.error
    });
    response.then(()=>{
      setTimeout(() => {
        navigate(`/Cities/${itineraryData.cityId}/${top}`)
      }, 2000);
    })
   
  }

  async function getItinerary() {
    let response = await axios.get(`https://mytinerarybackend-7pod.onrender.com/itineraries/one/${id}`)
    setItineraryData(response.data.response)
  }

  function getPhotos(e) {
    let urls = []
    let arrayPhotos = Array.from(e.target.files)

    for (let i = 0; i < arrayPhotos.length; i++) {
      let url = URL.createObjectURL(arrayPhotos[i])
      urls.push(url)
    }
    setUrlPhotos(urls)
    setCommentData({ ...commentData, photo: arrayPhotos })
  }

  function renderPhotos() {
    let template = []
    for (let i = 0; i < urlPhotos.length; i++) {
      template.push(<img className='h-full w-[15vw] object-cover rounded-xl' src={urlPhotos[i]} alt="" />)
    }
    return template
  }


  useEffect(() => {
    if (!token || !token.length > 0) {
      navigate('/SignIn')
    }
    getItinerary()
  }, [])

  return (
    <div className='w-screen h-full lg:h-screen flex flex-col lg:flex-row '>
      <div className='w-full lg:w-4/12 mt-[8vh] lg:mt-0 h-full flex flex-col items-center justify-center px-2 lg:px-10'>
        <div className='w-full h-4/6 md:5/6 flex flex-col items-center justify-center lg:border-r gap-10'>
          <h1 className='text-center text-4xl font-semibold'>Tell us your experience in:</h1>
          <div className='w-5/6 md:w-4/6 h-3/5 border py-2 px-2 flex flex-col items-center gap-2 lg:gap-4 rounded-xl'>
            <p className='text-2xl font-semibold'>{itineraryData?.title}</p>
            <img className='w-full rounded-xl' src={itineraryData?.photo} alt="" />
            <div className='w-full px-1 lg:px-4 flex flex-col gap-1'>
              <p className='text-xl'>From:</p>
              <div className='flex items-start gap-2'>
                <img className='h-[5vh] lg:h-[4vh] w-[11vw] md:w-[5vw] lg:w-[3vw] object-cover object-center rounded-full' src={itineraryData?.userId.photo} alt="" />
                <p className='font-semibold'>{itineraryData?.userId.name} {itineraryData?.userId.surname}</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className='w-full lg:w-8/12 h-full lg:overflow-y-auto pt-[5vh] lg:pt-[10vh]'>
        <form onSubmit={(e) => createComment(e)} className='w-full flex flex-col px-5 lg:px-0 gap-6' action="">

          <div className='w-full lg:w-8/12 flex flex-col gap-4'>
            <p className='font-semibold text-xl'>Value your experience</p>
            <div className='flex items-center gap-2 lg:gap-0 w-full lg:w-10/12 xl:w-8/12'>
              <div className='flex gap-2 w-fit lg:w-4/6 '>
                {valoration.map((val, index) => {
                  return <span onClick={() => setCommentData({ ...commentData, valoration: { value: val.value, textValue: val.textValue } })} className={`w-9 lg:w-10 h-9 lg:h-10 rounded-full border border-black ${val.value <= commentData.valoration.value ? "bg-[#2dc77f]" : "bg-[white]"} hover:bg-[#2dc77f]`}></span>
                })}
              </div>
              <p className='font-semibold'>{commentData.valoration.value == undefined ? "" : commentData?.valoration.textValue}</p>
            </div>
            <p className={`text-sm text-red-600 opacity-0 ${commentError.valoration && "opacity-100"}`}>* Obligatory field</p>
          </div>

          <fieldset className='flex flex-col gap-4'>
            <label className='font-semibold text-xl'>Title</label>
            <input maxLength={80} onChange={(e) => setCommentData({ ...commentData, title: e.target.value })} type="text" min={4} max={100} className={`border ${commentError.title && "border-red-600"} md:w-11/12 w-full lg:w-8/12 px-2 py-2 rounded-lg`} placeholder='Write a title for your experience' />
            <div className='w-full md:w-11/12 lg:w-8/12 flex justify-between'>
              <p className={`text-xs lg:text-sm text-red-600 opacity-0 ${commentError.title && "opacity-100"}`}>* Obligatory field</p>
              <p className='font-light text-xs lg:text-sm'>{commentData.title.length} of 80 characters maximum</p>
            </div>
          </fieldset>

          <fieldset className='flex flex-col gap-4'>
            <label className='font-semibold text-xl'>Message</label>
            <textarea minLength={100} onChange={(e) => setCommentData({ ...commentData, text: e.target.value })} placeholder='The restaurant was so good...' name="" id="" className={`w-full  md:w-11/12 lg:w-8/12 h-[20vh] border ${commentError.text && "border-red-600"} px-2 py-1 resize-none rounded-lg`}></textarea>
            <div className='w-full md:w-11/12 lg:w-8/12 flex justify-between'>
              <p className={`text-xs lg:text-sm text-red-600 opacity-0 ${commentError.text && "opacity-100"}`}>* Must have almost 100 characters</p>
              <p className='font-light text-xs lg:text-sm'>{commentData.text.length} of 100 characters minimum</p>
            </div>
          </fieldset>


          <div className='flex flex-col gap-4'>
            <p className='text-xl font-semibold'>Photo</p>
            {urlPhotos.length > 0 ?
              <div className='w-full h-[25vh] flex flex-col gap-2'>
                <div className='w-full h-5/6 md:h-4/6 flex gap-5 overflow-x-auto'>
                  {renderPhotos()}
                </div>
                <div className='w-full  md:w-2/6 lg:w-1/6 h-1/6 bg-[#2dc77f] border flex items-center rounded-xl justify-center relative'>
                  <p className='font-semibold text-white absolute'>Change</p>
                  <input onChange={(e) => getPhotos(e)}  accept='.jpeg,.png,.jpg' className='w-full h-full opacity-0 ' type="file" multiple />
                </div>
              </div>
              :
              <div className='bg-gray-100 relative w-full md:w-11/12 lg:w-8/12 h-[20vh] border flex items-center justify-center rounded-lg'>
                <input onChange={(e) => getPhotos(e)} className='w-full h-full opacity-0 z-10' type="file" multiple accept='.jpeg,.png,.jpg' />
                <div className='flex flex-col items-center justify-center absolute z-0'>
                  <p className=''>Upload one or more photos!</p>
                  <p>press or drag and drop them</p>
                  <img className='w-[8vh]' src={notPhotos} alt="" />
                </div>

              </div>}
          </div>

          <div className='w-full lg:w-8/12 h-[10vh] flex items-center justify-start px-2 '>
            <button className='bg-[#2dc77f] rounded-lg w-full lg:w-1/3 hover:scale-105'><p className='text-xl px-2 py-1  text-white font-semibold'>Comment</p></button>
          </div>


        </form>
      </div>
    </div>
  )
}

export default CommentForm