import { createSlice } from "@reduxjs/toolkit";

import { User } from '../../types'

const USER = 'user'
const initialState : Partial<User> = {}

const userSlice = createSlice({
    name: USER,
    initialState,
    reducers: {
        setUser: (_, action) => {
            return action.payload
        }
    }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer