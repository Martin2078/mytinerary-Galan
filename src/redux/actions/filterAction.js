import { createAction } from "@reduxjs/toolkit";

const filterCities=createAction('filterCities',(cities)=>{
    return {
        payload:{cities}
    }
})

export default filterCities