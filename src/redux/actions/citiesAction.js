import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const citiesAction=createAsyncThunk('citiesAction',async()=>{
    try {
        let response = await axios.get('http://localhost:8080/cities')
        return response.data.response
    } catch (error) {
        
    }
})




export default citiesAction