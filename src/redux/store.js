import { configureStore } from "@reduxjs/toolkit";
import { reduxState } from "./constants";
import { getInitState } from "./initState";
import { mainReducer } from "./reducer";
import { filterReducer } from "./slices/filterSlice";



export const store = configureStore({
    reducer: {
        user: mainReducer,
        filter: filterReducer,
    },
    preloadedState: getInitState(),

})

store.subscribe(() => window.localStorage.setItem(reduxState, JSON.stringify(store.getState())))