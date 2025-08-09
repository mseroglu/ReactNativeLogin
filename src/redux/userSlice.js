import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: null,
    password: null,
    isLoading: false,
    isAuth: true,
    backend: {
        username: "asd",
        pass: "123"
    }
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setEmail: (state, action) => {
            const lowerCase = action.payload.toLowerCase()
            state.email = lowerCase
        },
        setPassword: (state, action) => {
            state.password = action.payload
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setIsAuth: (state, action) => {
            state.isAuth = action.payload
        },
        setLogin: (state) => {
            state.isAuth = (state.email === state.backend.username) && (state.password === state.backend.pass)
        }
    }
})

export const { setEmail, setPassword, setIsLoading, setIsAuth, setLogin } = userSlice.actions
export default userSlice.reducer