import { createAction } from "@reduxjs/toolkit";

const profile=createAction(
    'profile',(data)=>{
        return {
            payload:data
        }
        }
)

export default profile