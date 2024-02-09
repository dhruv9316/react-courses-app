import {combineReducers} from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

import courseReducer from "./slices/courseSlice"
import userReducer from "./slices/userSlice"

const rootReducer  = combineReducers({
    course: courseReducer,
    user: userReducer,
})

const store = configureStore({
    reducer: rootReducer,
})

export default store