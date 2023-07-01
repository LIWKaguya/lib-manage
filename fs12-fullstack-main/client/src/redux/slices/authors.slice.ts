import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { Author } from "types"
import authorsService from '../../services/authors.service'

const AUTHORS = 'authors'
const initialState : Author[] = []

export const getAllAuthors = createAsyncThunk(`${AUTHORS}/getAll`, async () => {
    try {
        const authors = await authorsService.getAll()
        return authors
    } catch (error) {
        console.log(error)
    }
})

const authorsSlice = createSlice({
    name: AUTHORS,
    initialState,
    reducers: {
        addAuthor: (state, action) => {
            const authors : Author[] = [...state, action.payload]
            return authors
        },
        setAuthors: (_, action) => {
            const authors : Author[] = action.payload
            return authors
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllAuthors.fulfilled, (_, action) => {
            const authors : Author[] = action.payload
            return authors
        })
    }
})

export const { addAuthor, setAuthors } = authorsSlice.actions
export default authorsSlice.reducer