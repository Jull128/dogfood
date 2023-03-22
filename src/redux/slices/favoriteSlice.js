import { createSlice } from "@reduxjs/toolkit";
import { initState } from "../initState";

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: initState.favorite,
    reducers: {
        addFavoriteProduct(state, action) {
            const currentProduct = state.find(
                (product) => product.id === action.payload.id,
            );
            if (!currentProduct) state.unshift({
                ...action.payload,
                count: 1,
            })
        },
        deleteFavoriteProduct(state, action) {
            return state.filter((product) => product.id !== action.payload);
        },
        resetFavoriteInfo() {
            return initState.favorite
        },
    }
})

export const { addFavoriteProduct, deleteFavoriteProduct, resetFavoriteInfo } = favoriteSlice.actions;
export const favoriteReducer = favoriteSlice.reducer;
export const getFavoriteSelector = (state) => state.favorite;