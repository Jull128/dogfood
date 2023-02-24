import { combineReducers } from "redux";
import { tokenReducer } from "./slices/tokenSlice";


export const mainReducer = combineReducers({
    token: tokenReducer,
    // filter: filterReducer
})