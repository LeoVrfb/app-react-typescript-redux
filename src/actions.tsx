// actions.tsx
import { SetUsernameAction, SetPasswordAction, LoginRequestAction, LoginSuccessAction, LoginFailureAction } from './types'

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SET_USERNAME = 'SET_USERNAME';
export const SET_PASSWORD = 'SET_PASSWORD';
export const ADDITEM = 'ADD_ITEM';
export const UPDATEITEM = 'UPDATE_ITEM';


export const setUsername = (username: string): SetUsernameAction => {
    return {
        type: SET_USERNAME,
        payload: { username },
    };
};

export const setPassword = (password: string): SetPasswordAction => {
    return {
        type: SET_PASSWORD,
        payload: { password },
    };
};

export const loginRequest = (username: string, password: string): LoginRequestAction => ({
    type: LOGIN_REQUEST,
    payload: { username, password },
});

export const loginSuccess = (): LoginSuccessAction => ({
    type: LOGIN_SUCCESS,
    payload: {


    }
});

export const loginFailure = (error: string): LoginFailureAction => ({
    type: LOGIN_FAILURE,
    payload: { error },
});