import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
const Carrousel = ({data,classes,img}) => {

    const settings={
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,

    }
    
  return (
    <div className={`${classes} z-0 `}>
        <Slider {...settings}>
          {data.map((photo)=>{
            return <div className=''>
                <img className={`${img}`} src={photo} alt="" />
            </div>
          })}
        </Slider>
    </div>
  )
}

export default Carrousel