import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ubication from '../assets/ubication.png'
import arrowPagination from '../assets/arrowPagination.png'
import notFinded from '../assets/notFinded.png'

const CitiesConteiner = ({cities,maxPages,next,prev,setPage,page}) => {
      function createPageButton(start, end) {
        let template = []
        for (let i = start; i <= end; i++) {
          template.push(
            <button onClick={() => setPage(i)} className='text-lg'><p className={`${page == i && "text-blue-700"} font-semibold`}>{i}..</p></button>
          )
        }
        return template
      }


  return (
    <div className='w-full min-h-[37vh] mt-[2vh] flex flex-wrap items-start justify-center py-[3vh] px-[4vw]'>

          {cities?.length > 0 ?
            <>
              <div className='w-full min-h-[33vh] flex flex-wrap items-start justify-center gap-x-[3vw] gap-y-[4vh]'>
                {cities.map((city,index) => {
                  return <div key={city?.cityName} className='cursor-pointer w-[80vw] md:w-[40vw] lg:w-[20vw] h-[20vh] rounded-xl bg-white px-3 py-3 flex flex-col justify-between lg:hover:scale-110' style={{ backgroundImage: `url(${city.photo[0]})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                    <div className='flex flex-col gap-1'>
                      <h4 className='text-white font-bold text-lg'>{city?.cityName}</h4>
                      <div className='flex items-center gap-1'>
                        <img className='h-5' src={ubication} alt="" />
                        <p className='text-white text-base'>{city?.country}</p>
                      </div>
                    </div>
                    <button className='w-3/6 bg-[#2dc77f] rounded py-1'><Link to={`/Cities/${city._id}/${index+1}`}><p className='text-white'>View More</p></Link></button>
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
              <p className='text-xl text-center'>Sorry, there is no city with that name!</p>
            </div>
          }




        </div>
  )
}

export default CitiesConteiner