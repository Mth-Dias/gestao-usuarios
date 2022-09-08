import { createAction, createReducer } from "@reduxjs/toolkit";

const INITIAL_STATE = {}

export const userData = createAction('VALIDATE');

export default createReducer(INITIAL_STATE, {
    [userData.type]: (state, action) => ({ ...action.payload})
})