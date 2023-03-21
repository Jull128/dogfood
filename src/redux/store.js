import { configureStore } from "@reduxjs/toolkit";
import { reduxState } from "./constants";
import { getInitState } from "./initState";
import { cartReducer } from "./slices/cartSlice";
import { favoriteReducer } from "./slices/favotiteSlice";
import { filterReducer } from "./slices/filterSlice";
import { tokenReducer } from "./slices/tokenSlice";



export const store = configureStore({
    reducer: {
        user: tokenReducer,
        filter: filterReducer,
        cart: cartReducer,
        favorite: favoriteReducer,
    },
    preloadedState: getInitState(),

})

store.subscribe(() => window.localStorage.setItem(reduxState, JSON.stringify(store.getState())))