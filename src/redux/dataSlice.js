import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs, orderBy, query, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";


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
    const auth = getAuth();
    const user = auth.currentUser;

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

export const delTodo = createAsyncThunk("todo/del", async (id) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;
        await deleteDoc(doc(db, "users", user.uid, "todos", id))
        console.log("todo silindi..")
        return id
    } catch (error) {
        console.log("delTodo HATA: ", error)
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
        },
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

            // delete
            .addCase(delTodo.pending, (state) => {
                state.isLoading = true
            })
            .addCase(delTodo.fulfilled, (state, action) => {
                state.isLoading = false
                state.error = null
                state.todos = state.todos.filter(item => item.id !== action.payload)
            })
            .addCase(delTodo.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })


    }


})

export const { setInputTodo, setIsLoading, setClearTodos } = todoSlice.actions
export default todoSlice.reducer

