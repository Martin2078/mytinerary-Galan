import { createReducer } from "@reduxjs/toolkit";
import profile from "../actions/userAction.js";
import logOutAction from "../actions/logOutAction.js";

const initialState={
    user:null,
    token:""
}

const profileReducer=createReducer(initialState,(builder)=>{
    builder
        .addCase(profile,(state,action)=>{
            const newState={
                ...state,
                user:action.payload.userFinded,
                token:action.payload.token
            }

        return newState
        })
        .addCase(logOutAction,(state,action)=>{
            return initialState
        })
})

export default profileReducer