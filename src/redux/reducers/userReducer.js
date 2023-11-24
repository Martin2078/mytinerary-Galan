import { createReducer } from "@reduxjs/toolkit";
import profile from "../actions/userAction.js";
import logOutAction from "../actions/logOutAction.js";

const initialState={
    user:null,
    token:"",
    favorites:[],
}

const profileReducer=createReducer(initialState,(builder)=>{
    builder
        .addCase(profile.logIn,(state,action)=>{
            console.log(action.payload);
            const newState={
                ...state,
                user:action.payload.userFinded,
                token:action.payload.token,  
            }
            if (action.payload.favorites) {
                newState.favorites=action.payload.favorites
            }else{
                newState.favorites=action.payload.userFinded.favorites
            }
        return newState
        })
        .addCase(profile.addFavorite,(state,action)=>{
            const newState={
                ...state,
                favorites:action.payload,
            }

        return newState
        })
        .addCase(profile.deleteFavorite,(state,action)=>{
            const newState={
                ...state,
                favorites:action.payload,
            }

        return newState
        }) 
        .addCase(logOutAction,(state,action)=>{
            return initialState
        })
})

export default profileReducer