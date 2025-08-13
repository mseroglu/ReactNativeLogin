import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs, orderBy, query, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";




export const newTodo = createAsyncThunk("todo/newTodo", async (data) => {
    try {
        const auth = getAuth();
        user = auth?.currentUser

        if (user) {
            const refDoc = await addDoc(collection(db, 'users', user.uid, "todos"), data);
            return refDoc.data
        }
    } catch (error) {
        console.log("newTodo hata ouştu.. ", error)
        throw error
    }
})


export const getAllTodos = createAsyncThunk("todo/getTodos", async () => {
    console.log("getAllTodos çalıştı..")
    const auth = getAuth();
    const user = auth.currentUser;
    //let user = await AsyncStorage.getItem("user")
    //user = JSON.parse(user)

   // if (!user) user = auth.currentUser

    const todos = []
    try {

        if (user) {
            const q = query(collection(db, 'users', user.uid, "todos"), orderBy("title", "asc"))
            const data = await getDocs(q)
            data.forEach(item => todos.push({ ...item.data(), id: item.id }))
            return todos
        }
    } catch (error) {
        console.log("getAllTodos hata ouştu.. ", error)
        throw error
    }
})

export const updateTodo = createAsyncThunk("todo/update", async ({ id, isDone }) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            await updateDoc(doc(db, 'users', user.uid, "todos", id), { "isDone": isDone })
            return { isDone, id }
        }
    } catch (error) {
        console.log("hataaaaaa updateTodo ..")
        throw error
    }
})

const initialState = {
    todos: [],
    inputTodo: "",
    isLoading: false,
    error: null,
    isChange: false

}

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setIsLoading: (state) => {
            state.isLoading = false
        },
        setInputTodo: (state, action) => {
            state.inputTodo = action.payload
        },
        setClearTodos: (state) => {
            state.todos = []
        }

    },
    extraReducers: (builder) => {
        builder
        // add new todo
            .addCase(newTodo.pending, (state) => {
                state.isLoading = true
            })
            .addCase(newTodo.fulfilled, (state) => {
                state.isLoading = false
                state.inputTodo = ""
                state.isChange = !state.isChange
            })
            .addCase(newTodo.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })

            // get todos
            .addCase(getAllTodos.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllTodos.fulfilled, (state, action) => {
                state.isLoading = false
                state.error = null
                state.todos = action.payload
            })
            .addCase(getAllTodos.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })

            // update todo
            .addCase(updateTodo.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                state.isLoading = false
                state.error = null
                state.todos = state.todos.map(item => item.id == action.payload.id ? { ...item, isDone: action.payload.isDone } : item)
            })
            .addCase(updateTodo.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error
            })

    }


})

export const { setInputTodo, setIsLoading, setClearTodos } = todoSlice.actions
export default todoSlice.reducer

