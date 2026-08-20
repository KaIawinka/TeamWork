import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/AuthSlice";

const myStore = configureStore({
    reducer: {
        auth: authReducer
    }
})

export default myStore