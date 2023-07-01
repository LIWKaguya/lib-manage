import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { Book } from "types"
import booksService from '../../services/books.service'

const BOOKS = 'books'
const initialState : Book[] = []

export const getAllBooks = createAsyncThunk(`${BOOKS}/getAll`, async () => {
    try {
        const books = await booksService.getAll()
        return books
    } catch (error) {
        console.log(error)
    }
})

const booksSlice = createSlice({
    name: BOOKS,
    initialState,
    reducers: {
        addNewBook: (state, action) => {
            const books : Book[] = [...state, action.payload] 
            return books
        },
        setBooks: (_, action) => {
            const books : Book[] = action.payload
            return books
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllBooks.fulfilled, (_, action) => {
            return action.payload
        })
    }
})

export const { addNewBook, setBooks } = booksSlice.actions
export default booksSlice.reducer