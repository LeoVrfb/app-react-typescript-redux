import { LOGIN_SUCCESS, LOGIN_FAILURE, SET_USERNAME, SET_PASSWORD, LOGIN_REQUEST } from './actions';
import { Action } from 'redux';

export interface AuthState {
    username: string;
    password: string;
    isLoggedIn: boolean;
    error: string | null;
}


export interface LoginRequestAction extends Action<typeof LOGIN_REQUEST> {
    payload: {
        username: string;
        password: string;
    };
}
export interface LoginSuccessAction extends Action<typeof LOGIN_SUCCESS> {
    payload: {
        // Définissez ici les propriétés que vous souhaitez inclure dans l'action de succès
    };
}

export interface LoginFailureAction extends Action<typeof LOGIN_FAILURE> {
    payload: {
        error: string;
    };
}

export interface SetUsernameAction extends Action<typeof SET_USERNAME> {
    payload: {
        username: string;
    };
}

export interface SetPasswordAction extends Action<typeof SET_PASSWORD> {
    payload: {
        password: string;
    };
}

export type AuthAction =
    | LoginRequestAction
    | LoginSuccessAction
    | LoginFailureAction
    | SetUsernameAction
    | SetPasswordAction;




// Autres types liés à l'application
