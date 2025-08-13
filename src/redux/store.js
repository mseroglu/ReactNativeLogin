import { configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import userReducer from './userSlice'
import todoReducer from './dataSlice'


export const store = configureStore({
    reducer: {
        user: userReducer,
        todo: todoReducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})

