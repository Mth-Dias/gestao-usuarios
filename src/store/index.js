import { configureStore } from "@reduxjs/toolkit";
import isLogged from "./isLogged";
import userData from './userData';

export default configureStore({
    reducer:{
        data: userData,
        authLogin: isLogged
    }
})