import { configureStore } from "@reduxjs/toolkit";
import profileReducer from './reducers/userReducer.js'
import citiesReducer from "./reducers/citiesReducer.js";
const store=configureStore({
    reducer:{
        profileReducer,
        citiesReducer
    }
})
export default store