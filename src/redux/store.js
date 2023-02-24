import { configureStore } from "@reduxjs/toolkit";
import { reduxState } from "./constants";
import { getInitState } from "./initState";
import { mainReducer } from "./reducer";



export const store = configureStore({
    reducer: {
        user: mainReducer,
    },
    preloadedState: getInitState(),
    // filter: filterReducer,
})

store.subscribe(() => window.localStorage.setItem(reduxState, JSON.stringify(store.getState())))