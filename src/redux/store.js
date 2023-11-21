import { configureStore } from "@reduxjs/toolkit";
import profileReducer from './reducers/userReducer.js'
import citiesReducer from "./reducers/citiesReducer.js";
import filterReducer from "./reducers/filterReducer.js";
const store=configureStore({
    reducer:{
        profileReducer,
        citiesReducer,
        filterReducer
    }
})
export default store