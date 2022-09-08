import { createAction, createReducer } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    isAuth: false
}

export const isLogged = createAction('ISLOGGED');

export default createReducer(INITIAL_STATE, {
    [isLogged.type]: (state, action) => ({ ...state, isAuth: true})
})