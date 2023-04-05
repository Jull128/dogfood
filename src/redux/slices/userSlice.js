import { createSlice } from "@reduxjs/toolkit";
import { initState } from "../initState";


const userSlice = createSlice({
    name: 'user',
    initialState: initState.user,
    reducers: {
        setToken(state, action) {
            state = action.payload.data;
            state.token = action.payload.token;
            return state;
        },
        clearToken() {
            return '';
        }
    }
})

export const { setToken, clearToken } = userSlice.actions;
export const userReducer = userSlice.reducer;
export const getUserSelector = (state) => state.user;
export const getTokenSelector = (state) => state.user.token