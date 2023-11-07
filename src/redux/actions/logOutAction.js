import { createAction } from "@reduxjs/toolkit";

const logOutAction=createAction('logOutAction',()=>{
    return {payload:{}}
})

export default logOutAction