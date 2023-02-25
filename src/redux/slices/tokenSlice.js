import { createSlice } from "@reduxjs/toolkit";
import { initState } from "../initState";


const tokenSlice = createSlice({
    name: 'token',
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

export const { setToken, clearToken } = tokenSlice.actions;
export const tokenReducer = tokenSlice.reducer;
export const getUserSelector = (state) => state.user;
export const getTokenSelector = (state) => state.user.token