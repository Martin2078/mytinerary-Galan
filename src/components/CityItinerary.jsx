import React, { useState } from 'react'
import save from '../assets/save.png'
import notSave from '../assets/notSave.png'

const CityItinerary = ({itinerary,setCityDetails,setDataItinerary}) => {
    return (
        <div onClick={()=>{setDataItinerary(itinerary);setCityDetails(true)}} className='w-[30vw] h-[40vh] shadow-md rounded-lg  cursor-pointer'>
            <img className='w-full h-[28vh] object-cover rounded-lg hover:opacity-90' src={itinerary?.photo} alt="" />
            <div className='w-full h-[12vh] flex flex-col justify-between relative px-3 py-2'>
                <button className='absolute top-4 right-4 hover:scale-105'><img className='w-5' src={notSave} alt="" /></button>

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