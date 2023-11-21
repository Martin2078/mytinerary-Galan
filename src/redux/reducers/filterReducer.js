import { createReducer } from "@reduxjs/toolkit";
import filterCities from "../actions/filterAction";
import citiesAction from "../actions/citiesAction";
const initialState={
    cities:null
}
const filterReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(citiesAction.fulfilled,(state,action)=>{
            const newState = {
                ...state,
                cities: action.payload
            }
            return newState
        })
        .addCase(filterCities, (state, action) => {
            console.log("reducer", action.payload);
            const newState = {
                ...state,
                cities: action.payload.cities
            }
            return newState
        })
})

export default filterReducer