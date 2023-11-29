import React, { useEffect, useState } from 'react'
import carrouselButton from '../assets/carrouselButton.png'
import carrouselButtonBlue from '../assets/carrouselButtonBlue.png'
import '../style.css'
const Carrousel = ({ data, classes, buttonsClasses }) => {
  const [position, setPosition] = useState(0)
  const [timeoutId, setTimeoutId] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  function handleTouchStart(event) {
    setTouchStartX(event.touches[0].clientX);
  }
  function handleTouchMove(event) {
    setTouchEndX(event.touches[0].clientX);
  }
  function handleTouchEnd() {
    if (touchStartX && touchEndX) {
      const difference = touchEndX - touchStartX;
      if (difference > 0) {
        if (position===0) {
          setPosition(data.length-1)
        }else{
          setPosition(position-1)
        }
      } else if (difference < 0) {

        if (position===data.length-1) {
          setPosition(0)
        }else{
          setPosition(position+1)
        }
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  }
  function changePhoto() {
    if (position==data.length-1) {
      setPosition(0)
    }else{
      setPosition(position+1)
    }
  }
  function startTimeOut() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutId = setTimeout(changePhoto, 4500);
    setTimeoutId(newTimeoutId);
  }

  useEffect(()=>{
    startTimeOut()
  },[position])
  return (
    <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} className={`${classes} `} style={{backgroundImage:`url(${data[position]})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'center'}}>
      
      <div className={`py-2 absolute z-50 flex bottom-[10%] lg:bottom-[5%] left-[35%] md:left-[41%] lg:left-[45%] w-[30vw] md:w-[20vw] lg:w-[10vw]  items-center justify-evenly Glassmorphism ${buttonsClasses}`}>
        {data.map((photo,index)=>{
           return <button key={index} className='z-10' onClick={()=>{setPosition(index)}}><img className='w-3' src={index==position?carrouselButtonBlue:carrouselButton} alt="" /></button>
        })}
      </div>
    </div>
  )
}

export default Carrousel