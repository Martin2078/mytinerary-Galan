import React, { useState } from 'react'

const CityItinerary = ({itinerary,setCityDetails,setDataItinerary}) => {
    return (
        <div onClick={()=>{setDataItinerary(itinerary);setCityDetails(true)}} className='w-full md:w-[45vw] px-4 lg:px-0 lg:w-[40vw] xl:w-[30vw] h-[40vh] shadow-md rounded-lg  cursor-pointer'>
            <img className='w-full h-[28vh] object-cover rounded-lg hover:opacity-90' src={itinerary?.photo} alt="" />
            <div className='w-full h-[12vh] flex flex-col justify-between relative px-3 py-2'>

                <h4 className='text-xl font-bold'>{itinerary?.title}</h4>
                {itinerary?.price.map((bill, index) => {
                    const template = []
                    for (let i = 0; i < bill; i++) {
                        template.push("$")
                    }
                    if (index == 0) {
                        template.push("-")
                    }
                    return template
                })}
                <p className=''>{itinerary?.hashtags.map((hashtag) => {
                    return `${hashtag} `
                })}</p>
            </div>
        </div>
    )
}

export default CityItinerary