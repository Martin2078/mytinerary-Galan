import React, { useEffect, useState } from 'react'
import searchIcon from '../assets/search-icon.png'
import { Link } from 'react-router-dom'
import ubication from '../assets/ubication.png'
import arrowPagination from '../assets/arrowPagination.png'
import axios from 'axios'
import notFinded from '../assets/notFinded.png'
import Carrousel from '../components/Carrousel'
import '../style.css'

const Cities = () => {
  const [text, setText] = useState("")
  const [page, setPage] = useState(1)
  const [next, setNext] = useState(false)
  const [prev, setPrev] = useState(false)
  const [maxPages, setMaxPages] = useState()
  const [cities, setCities] = useState()
  const [populars, setPopulars] = useState()
  async function getCities() {
    try {
      let response = await axios.get(`http://localhost:8080/cities?text=${text}&page=${page}`)
      setCities(response.data.response.cities)
      if (populars == undefined) {
        setPopulars([response.data.response.cities[0].photo[0], response.data.response.cities[1].photo[0], response.data.response.cities[2].photo[0], response.data.response.cities[3].photo[0]])
      }
      setPrev(response.data.response.prev)
      setNext(response.data.response.next)
      setMaxPages(response.data.response.maxPages)
    } catch (error) {
      console.log(error);
    }
  }
  function createPageButton(start, end) {
    let template = []
    for (let i = start; i <= end; i++) {
      template.push(
        <button onClick={() => setPage(i)} className='text-lg'><p className={`${page == i && "text-blue-700"} font-semibold`}>{i}..</p></button>
      )

    }

    return template
  }

  useEffect(() => {
    getCities()
  }, [text, page])


  return (
    <div className='max-w-screen min-h-screen '>
      <div className='w-full h-[55vh] relative'>
      {populars && <Carrousel data={populars} classes={"w-full h-full"} />}
      <div className='absolute top-[20%] left-2 lg:left-10 h-fit py-4 w-10/12 md:w-7/12 lg:w-5/12 rounded-xl GlassmorphismText animationDiv flex items-center justify-center '>
        <p className=' text-white text-xl md:text-3xl lg:text-3xl xl:text-4xl font-semibold'>Find your perfect Itinerary</p>
      </div>
      <div className='absolute top-[40%] right-2 lg:right-10 h-fit py-4 w-8/12 md:w-6/12 lg:w-5/12 rounded-xl GlassmorphismText animationDiv2 flex items-center justify-center '>
        <p className=' text-white text-xl md:text-3xl lg:text-3xl xl:text-4xl font-semibold'>Experience it all</p>
      </div>
      <div className='absolute top-[60%] left-2 lg:left-10 h-fit py-4 w-10/12 md:w-7/12 lg:w-5/12 rounded-xl GlassmorphismText animationDiv3 flex items-center justify-center '>
        <p className=' text-white text-xl md:text-3xl lg:text-3xl xl:text-4xl font-semibold'>Your adventure starts here</p>
      </div>
      </div>

      <div className='w-full h-full flex flex-col items-center mt-[2vh] '>

        <div className='flex items-center justify-center w-10/12 lg:w-4/12 h-[4vh] rounded border px-4 py-1 checked:border-2'>
          <input onChange={(e) => { setText(e.target.value); setPage(1) }} className='w-full h-full outline-none' type="text" placeholder='Search city' />
          <img className='h-full' src={searchIcon} alt="" />
        </div>

        <div className='w-full min-h-[37vh] mt-[2vh] flex flex-wrap items-start justify-center py-[3vh] px-[4vw]'>

          {cities?.length > 0 && cities[0] !== null ?
            <>
              <div className='w-full min-h-[33vh] flex flex-wrap items-start justify-center gap-x-[3vw] gap-y-[4vh]'>
                {cities.map((city) => {
                  return <div className='cursor-pointer w-[80vw] md:w-[40vw] lg:w-[20vw] h-[20vh] rounded-xl bg-white px-3 py-3 flex flex-col justify-between lg:hover:scale-110' style={{ backgroundImage: `url(${city.photo[0]})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                    <div className='flex flex-col gap-1'>
                      <h4 className='text-white font-bold text-lg'>{city?.cityName}</h4>
                      <div className='flex items-center gap-1'>
                        <img className='h-5' src={ubication} alt="" />
                        <p className='text-white text-base'>{city?.country}</p>
                      </div>
                    </div>
                    <button className='w-3/6 bg-emerald-500 rounded py-1'><Link to={`/Cities/${city._id}`}><p className='text-white'>View More</p></Link></button>
                  </div>
                })}
              </div>

              <div className='w-full h-[4vh] flex justify-center mt-[3vh]'>
                <div className='w-4/6 lg:w-1/6 h-full flex items-center justify-center gap-4'>
                  <button onClick={() => setPage(page - 1)} className={`${!prev && "hidden"}`}>
                    <img className='rotate-180' src={arrowPagination} alt="" />
                  </button>
                  {maxPages < 2 ? <button><p className='text-lg'>1</p></button> : createPageButton(1, maxPages)}
                  <button onClick={() => setPage(page + 1)} className={`${!next && "hidden"}`}>
                    <img src={arrowPagination} alt="" />
                  </button>
                </div>

              </div></>

            :
            <div className='w-full h-[25vh] lg:h-[30vh] flex flex-col items-center justify-center' style={{ opacity: 1 }}>
              <div className=' h-full '>
                <img className='w-full h-full' src={notFinded} alt="" />
              </div>
              <p className='text-xl text-center'>Sorry, there is no city or country with that name!</p>
            </div>
          }




        </div>
      </div>
    </div>
  )
}

export default Cities