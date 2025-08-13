import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getAuth,
    signOut,
    sendEmailVerification,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile
} from "firebase/auth"



export const login = createAsyncThunk("user/login", async ({ email, password }) => {
    try {
        const auth = getAuth()
        const userCredential = await signInWithEmailAndPassword(auth, email, password)

        const user = userCredential.user

        console.log(user)

        // Gerekli kullanıcı bilgilerini sakla
        const userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
        };

        return userData
    } catch (error) {
        console.log("login HATA: ", error)
        throw error
    }

})


export const autoLogin = createAsyncThunk("user/autoLogin", async (_, { rejectWithValue }) => {
    const auth = getAuth();

    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const freshToken = await user.getIdToken(true);
                resolve({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    token: freshToken,
                });
            } else {
                reject(rejectWithValue("Oturum bulunamadı"));
            }
        });
    });

}
);


export const register = createAsyncThunk("user/register", async ({ email, password, displayName }) => {
    try {
        const auth = getAuth()
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)

        const user = userCredential.user

        const userData = {
            name: user.displayName,
            email: user.email,
            uid: user.uid
        }

        await updateProfile(user, {
            displayName: displayName,
        });

        await sendEmailVerification(user)

        return userData

    } catch (error) {
        console.error("register HATA: ", error);
        throw error
    }
})

export const logout = createAsyncThunk("user/logout", async () => {
    try {
        const auth = getAuth()
        await signOut(auth)
        return null
    } catch (error) {
        console.log("logout HATA: ", error)
        throw error
    }
})


const initialState = {
    isLoading: false,
    isAuth: false,
    userData: null,
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
        clearError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            // login
            .addCase(login.pending, (state) => {
                state.isLoading = true
                state.isAuth = false
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAuth = true
                state.userData = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isAuth = false
                state.error = action.error.message
            })
            // auto login
            .addCase(autoLogin.pending, (state) => {
                state.isLoading = true
                state.isAuth = false
            })
            .addCase(autoLogin.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAuth = true
                state.userData = action.payload
            })
            .addCase(autoLogin.rejected, (state) => {
                state.isLoading = false
                state.isAuth = false
                state.userData = null
            })
            // register
            .addCase(register.pending, (state) => {
                state.isLoading = true
                state.isAuth = false
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAuth = true
                state.userData = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isAuth = false
                state.userData = null
                state.error = action.payload
            })
            // logout
            .addCase(logout.pending, (state) => {
                state.isLoading = true
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false
                state.isAuth = false
                state.error = null
                state.userData = null
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export const { setEmail, setPassword, setIsLoading, setIsAuth, clearError } = userSlice.actions
export default userSlice.reducer