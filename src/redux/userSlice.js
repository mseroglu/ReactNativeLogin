import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"


export const login = createAsyncThunk("user/login", async ({ email, password }) => {
    try {
        const auth = getAuth()
        const userCredential = await signInWithEmailAndPassword(auth, email, password)

        const user = userCredential.user
        const token = user.stsTokenManager.accessToken

        const userData = {
            token,
            user: user,
        }

        return userData
    } catch (error) {
        console.log("userSlice.js line 19 ", error)
        throw error
    }

})


const initialState = {
    isLoading: false,
    isAuth: false,
    token: null,
    user: null,
    error: null,

}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setIsAuth: (state, action) => {
            state.isAuth = action.payload
        },
        clearError: (state) =>{
            state.error = null
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true
                state.isAuth = false
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAuth = true
                state.user = action.payload.user
                state.token = action.payload.token
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isAuth = false
                state.error = action.error.message
            })
    }
})

export const { setEmail, setPassword, setIsLoading, setIsAuth, clearError } = userSlice.actions
export default userSlice.reducer