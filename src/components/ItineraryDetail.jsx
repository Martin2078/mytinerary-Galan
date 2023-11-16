import closeBlack from '../assets/closeBlack.png'
import Carrousel from './Carrousel.jsx'
import notFavorite from '../assets/notFavorite.png'
import notComments from '../assets/notComments.png'
import Description from './Description.jsx'

const ItineraryDetail = ({ dataItinerary, setCityDetails }) => {

    return (
        <div className='fixed top-0 left-0 w-screen h-screen bg-[#0000003b] flex justify-end z-30'>
            <div className='max-w-[35vw] min-h-screen overflow-y-scroll px-1 bg-white animationMyItinerary relative rounded-l-2xl flex flex-col items-center'>
                <div className='w-full min-h-[6vh] flex justify-end px-2'>
                    <button onClick={() => setCityDetails(false)}><img className='w-5' src={closeBlack} alt="" /></button>
                </div>

                <div className='w-full h-full flex flex-col'>
                    <img className='h-[35vh] w-full object-cover rounded-xl' src={dataItinerary.photo} alt="" />
                    <div className='w-full px-5 flex flex-col gap-2 py-4  pb-12'>
                        <h1 className='text-3xl font-semibold'>{dataItinerary.title}</h1>
                        <div className='w-full flex items-center gap-2'>
                            <img className='w-4' src={notFavorite} alt="" />
                            <p>{dataItinerary.likes}</p>
                        </div>
                        <div className='w-full flex items-center gap-2'>
                            <p className='font-semibold text-xl'>Price:</p>
                            <p>{dataItinerary?.price.map((bill, index) => {
                                const template = []
                                for (let i = 0; i < bill; i++) {
                                    template.push("$")
                                }
                                if (index == 0) {
                                    template.push("-")
                                }
                                return template
                            })}</p>
                        </div>
                        <div className='w-full flex items-center gap-2'>
                            <p className='font-semibold text-xl'>Duration:</p>
                            <p>{dataItinerary.duration} minutes</p>
                        </div>
                        <p>{dataItinerary.hashtags.map((hash) => {
                            return `${hash} `
                        })}</p>
                    </div>
                </div>

                <div className='w-full px-5 py-5 pb-10 border-y flex flex-col gap-5'>
                    <h2 className='text-2xl font-semibold'>Activities</h2>
                    <div className='w-full flex flex-col items-center gap-5 px-5'>
                        {dataItinerary.activities.map((activity) => {
                            return <div className='w-full flex flex-col gap-2'>
                                <Carrousel data={activity.photo} classes={'h-[20vh] w-full rounded-xl object-cover'} buttonsClasses={'hidden'}/>
                                <h3 className='text-2xl font-semibold'>{activity.name}</h3>
                                <p className='text-zinc-400'>{activity.ubication}</p>
                                <Description info={activity.description} amountCharacters={130}/>
                            </div>
                        })}
                    </div>
                </div>

                <div className='w-full px-5 py-5 flex flex-col gap-5'>
                    <h2 className='font-semibold text-2xl'>Comments</h2>
                    {dataItinerary.comments.length<1
                    ?
                    <div className='w-full h-[25vh] flex flex-col items-center py-2 px-2'>
                        <p className='text-xl font-semibold'>There is no comments yet</p>
                        <p className='font-semibold'>Be the first in share your opinion</p>
                        <img className='w-full h-3/4 object-contain mt-2 rounded-xl' src={notComments} alt="" />
                    </div>
                    :
                    <div className='w-full'>
                        
                    </div>
                    }
                    
                    <input placeholder='Write a message' className='w-full border border-black rounded-xl px-2 py-2' type="text" />
                    
                </div>


            </div>

        </div>
    )
}

export default ItineraryDetail