import { createSlice } from "@reduxjs/toolkit";

const STACK = 'stack'
const initialState : string[] = []

const stackSlice = createSlice({
    name: STACK,
    initialState,
    reducers : {
        removeFromStack : (state, action) => {
            return state.filter(c => c !== action.payload)
        },
        addToStack : ( state, action) => {
            return [...state, action.payload]
        },
        setStack : (state, action) => {
            const stack : string[] = action.payload
            return stack
        }
    }
})

export const { removeFromStack, addToStack, setStack } = stackSlice.actions
export default stackSlice.reducer