import { createAction } from "@reduxjs/toolkit";


const logIn = createAction(
    'LogIn', (data) => {
        return {
            payload: data
        }
    }
)

const addFavorite = createAction('addFavorites', (data) => {
    return { payload: data }
})

const deleteFavorite = createAction('deleteFavorites', (data) => {
    return { payload: data }
})

const profile = { logIn, deleteFavorite, addFavorite }

export default profile