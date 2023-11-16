import React, { useState } from 'react'

const Description = ({ info, amountCharacters }) => {
    const [view, setView] = useState(false)
    return (
        <div className=''>
            <p className=''>{info.length > amountCharacters ? view ? info : `${info.slice(0, amountCharacters)}...` : info}</p>
            <button onClick={() => setView(!view)} className={`text-blue-700 font-semibold ${info.length < amountCharacters && "hidden"}`}>{view ? "View Less" : "View More"}</button>
          </div>
    )
}

export default Description