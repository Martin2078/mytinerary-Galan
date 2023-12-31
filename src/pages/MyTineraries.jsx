import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import searchIcon from '../assets/search-icon.png'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css';
import ItineraryCard from '../components/ItineraryCard'
import add from '../assets/add.png'
import notItineraries from '../assets/notItineraries.jpg'
import AddItinerary from '../components/AddItinerary'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import EditItinerary from '../components/EditItinerary'


const MyTineraries = () => {
  const { token, user } = useSelector((store) => store.profileReducer)
  const [countries, setCountries] = useState()
  const [myTineraries, setMyTineraries] = useState()
  const [createItinerary,setCreateItinerary]=useState(false)
  const [allCountries,setAllCountries]=useState()
  const [render,setRender]=useState(false)
  const navigate=useNavigate()

  
  async function getUserItineraries() {
    const response = await axios.get(`https://mytinerarybackend-7pod.onrender.com/itineraries/me/${user._id}`)
    setMyTineraries(response.data.response)
    const allCountries = response.data.response.map((itinerary) => {
      return itinerary.cityId.country
    })
    const uniques = new Set()
    for (const country of allCountries) {
      uniques.add(country)
    }
    setCountries(Array.from(uniques))
    setAllCountries(Array.from(uniques))
  }
  const [edit,setEdit]=useState(false)

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
      partialVisibilityGutter: 40
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      partialVisibilityGutter: 30
    },
    tablet: {
      breakpoint: { max: 768, min: 425 },
      items: 2,
      partialVisibilityGutter: 30
    },
    mobile: {
      breakpoint: { max: 425, min: 0 },
      items: 1,
      partialVisibilityGutter: 0
    }
  };

  function textFilter(e) {
    let text=e.target.value.toLowerCase().replaceAll(" ","")
    if (text=="") {
      setCountries(allCountries)
      return
    }
    let finded=countries.filter((country)=>country.toLowerCase().includes(text))
    setCountries(finded)
  }

  useEffect(() => {
    if (!token || token.length<1) {
      navigate('/SignIn')
    }
    getUserItineraries()
  }, [edit])

  return (
    <div className='w-full h-screen flex pt-[10vh] px-10 flex-col justify-between'>
      {edit && <EditItinerary itineraryInfo={edit} setEdit={setEdit} toast={toast} token={token}/>}
      <Toaster position='top-center' toastOptions={{custom:{duration:Infinity}}}/>
      {createItinerary && <AddItinerary setRender={setRender} setCreateItinerary={setCreateItinerary} />}
      <button onClick={()=>setCreateItinerary(true)} className='flex items-center justify-center rounded-full fixed bottom-5 right-5 bg-[#2dc77f]'><img className='px-2 py-2' src={add} alt="" /></button>
      <div className='w-full h-[12vh] lg:h-[10vh] flex lg:flex-row flex-col items-center justify-between'>
        <h1 className='lg:text-4xl xl:text-5xl text-2xl font-semibold'>MyTineraries</h1>
        <div className='w-4/6 lg:w-1/6 flex border-2 rounded-lg lg:mr-14 py-1'>
          <input onChange={(e)=>textFilter(e)} className='w-full px-1 rounded-lg outline-none' placeholder='Search country' type="text" />
          <img src={searchIcon} alt="" />
        </div>
      </div>

      <div className='w-full min-h-[75vh] flex flex-col items-center  gap-[5vh] '>
        {countries?.length > 0 ? countries.map((country,index) => {
          return <div key={index} className='w-[85vw] h-[30vh] shadow-md rounded-xl px-5 pt-2 flex flex-col'>
            <h2 className='text-3xl font-semibold h-[6vh]'>{country}</h2>
            <Carousel
              responsive={responsive}
              removeArrowOnDeviceType={["tablet", "mobile"]}
              transitionDuration={500}
              centerMode={false}
              autoPlay={true}
              autoPlaySpeed={3000}
              infinite
              additionalTransfrom={0}
              arrows
              className=""
              containerClass="container"
              draggable
              focusOnSelect={false}
              itemClass=""
              keyBoardControl
              minimumTouchDrag={80}
              partialVisible
              pauseOnHover
              renderArrowsWhenDisabled={false}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
            >
              {myTineraries.map((itinerary) => {
                if (itinerary.cityId.country == country) {
                  return <ItineraryCard setEdit={setEdit} setRender={setRender} itinerary={itinerary} toast={toast} token={token} />
                }
              })}
            </Carousel>
          </div>
        })
        :
        <div className='w-full lg:w-8/12 h-3/6 md:h-4/6 lg:h-5/6 flex items-end justify-center py-2 lg:py-5 shadow-lg rounded-lg' style={{backgroundImage:`url(${notItineraries})`,backgroundSize:'cover',backgroundPosition:'center'}}>
          <p className='text-2xl lg:text-3xl xl:text-4xl text-center font-semibold text-white'>There is no Itineraries!</p>
        </div>
      }
      </div>

    </div>
  )
}

export default MyTineraries