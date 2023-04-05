import { configureStore } from "@reduxjs/toolkit";
import { reduxState } from "./constants";
import { getInitState } from "./initState";
import { cartReducer } from "./slices/cartSlice";
import { favoriteReducer } from "./slices/favoriteSlice";
import { filterReducer } from "./slices/filterSlice";
import { userReducer } from "./slices/userSlice";



export const store = configureStore({
    reducer: {
        user: userReducer,
        filter: filterReducer,
        cart: cartReducer,
        favorite: favoriteReducer,
    },
    preloadedState: getInitState(),

})

store.subscribe(() => window.localStorage.setItem(reduxState, JSON.stringify(store.getState())))