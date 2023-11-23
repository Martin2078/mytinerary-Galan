import React, { useEffect, useRef, useState } from 'react'
import searchIcon from '../assets/search-icon.png'
import Carrousel from '../components/Carrousel'
import '../style.css'
import { useDispatch, useSelector } from 'react-redux'
import citiesAction from '../redux/actions/citiesAction'
import CitiesConteiner from '../components/CitiesConteiner'

const Cities = () => {
  const text=useRef()
  const [page, setPage] = useState(1)
  const [next, setNext] = useState(false)
  const [prev, setPrev] = useState(false)
  const [maxPages, setMaxPages] = useState(1)
  const [cities, setCities] = useState([])
  const [populars, setPopulars] = useState()
  const dispatch = useDispatch()
  const citiesStore = useSelector((store) => store.citiesReducer)

  function textFilter(e) {
    let textValue = e.target.value.toLowerCase().replaceAll(" ", "")
    if (textValue === "") {
      setCities(citiesStore.cities)
      setPage(1)
      return
    }
    let finded = citiesStore.cities.filter(city => city.cityName.toLowerCase().includes(textValue))
    setCities(finded)
    setPage(1)
  }


  function paginationCities() {
   if (citiesStore.cities !== null) {
    let array
    if (text.current.value!=="") {
      array=cities
    }else{
      array=citiesStore.cities
    }
    let maxPage = Math.ceil(array.length / 12)
    setMaxPages(maxPage)
    let lastIndex = page * 12
    setCities(array.slice(lastIndex - 12, lastIndex))
    if (page < maxPage) {
      setNext(true)
    } else {
      setNext(false)
    }
    if (page > 1) {
      setPrev(true)
    } else {
      setPrev(false)
    }
   }

  }



  useEffect(() => {
    if (citiesStore.cities !== null) {
        setCities(citiesStore.cities)
        paginationCities()
      if (populars === undefined) {
        setPopulars([citiesStore.cities[0].photo[0], citiesStore.cities[1].photo[0], citiesStore.cities[2].photo[0], citiesStore.cities[3].photo[0]])
      }
    } else {
      dispatch(citiesAction())
    }
  }, [citiesStore])

  useEffect(() => {
    paginationCities()
  }, [page,cities.length])








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
          <input ref={text} onChange={(e) => textFilter(e)} className='w-full h-full outline-none' type="text" placeholder='Search city' />
          <img className='h-full' src={searchIcon} alt="" />
        </div>
        <CitiesConteiner cities={cities} setPage={setPage} prev={prev} page={page} maxPages={maxPages} next={next} />
      </div>
    </div>
  )
}

export default Cities