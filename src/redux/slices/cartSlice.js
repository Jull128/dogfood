import { createSlice } from "@reduxjs/toolkit";
import { initState } from "../initState";

const cartSlice = createSlice({
    name: 'cart',
    initialState: initState.cart,
    reducers: {
        addNewProductInCart(state, action) {
            const currentProduct = state.find(
                (product) => product.id === action.payload.id,
            );
            if (currentProduct) {
                currentProduct.count++;
            } else {
                state.push({
                    ...action.payload,
                    isChecked: false,
                    count: 1,
                });
            }
        },
        deleteProduct(state, action) {
            return state.filter((product) => product.id !== action.payload);
        },

        countIncrement(state, action) {
            const currentProduct = state.find(
                (product) => product.id === action.payload.id,
            );
            if (currentProduct) {
                currentProduct.count++;
            } else {
                state.push({
                    ...action.payload,
                    isChecked: false,
                    count: 1,
                });
            }
        },
        countDecrement(state, action) {
            const currentProduct = state.find(
                (product) => product.id === action.payload,
            );
            currentProduct.count -= 1;
        },
        changeStatusIsChecked(state, action) {
            const currentProduct = state.find(
                (product) => product.id === action.payload,
            );
            currentProduct.isChecked = !currentProduct.isChecked;
        },
    }
})

export const { cartInitialize, addNewProductInCart, deleteProduct, countIncrement, countDecrement, changeStatusIsChecked } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export const getCartSelector = (state) => state.cart;