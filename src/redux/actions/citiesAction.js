import { createAction } from "@reduxjs/toolkit";

const citiesAction=createAction('citiesAction',(data)=>{
    return {
        payload:data
    }
})

export default citiesAction