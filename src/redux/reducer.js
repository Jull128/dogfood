import { combineReducers } from "redux";
// import { filterReducer } from "./slices/filterSlice";
import { tokenReducer } from "./slices/tokenSlice";


export const mainReducer = combineReducers({
    token: tokenReducer,
    // filter: filterReducer
})