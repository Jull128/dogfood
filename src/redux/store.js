import { configureStore } from "@reduxjs/toolkit";
import { reduxState } from "./constants";
import { getInitState } from "./initState";
import { filterReducer } from "./slices/filterSlice";
import { tokenReducer } from "./slices/tokenSlice";



export const store = configureStore({
    reducer: {
        user: tokenReducer,
        filter: filterReducer,
    },
    preloadedState: getInitState(),

})

store.subscribe(() => window.localStorage.setItem(reduxState, JSON.stringify(store.getState())))