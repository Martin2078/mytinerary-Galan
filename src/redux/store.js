import { configureStore } from "@reduxjs/toolkit";
import profileReducer from './reducers/userReducer.js'
const store=configureStore({
    reducer:{
        profileReducer
    }
})
export default store