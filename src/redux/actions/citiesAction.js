import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const citiesAction=createAsyncThunk('citiesAction',async()=>{
    try {
        let response = await axios.get('https://mytinerarybackend-7pod.onrender.com/cities')
        return response.data.response
    } catch (error) {
        
    }
})




export default citiesAction