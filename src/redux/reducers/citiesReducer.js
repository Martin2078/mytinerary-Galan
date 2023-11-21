import { createReducer } from "@reduxjs/toolkit";
import citiesAction from "../actions/citiesAction.js";

const initialState={
    cities:null
}

const citiesReducer=createReducer(initialState,(builder)=>{
    builder
    .addCase(citiesAction.fulfilled,(state,action)=>{
        const newState={
            ...state,
            cities:action.payload
        }
        
        return newState
    })
}

)

export default citiesReducer