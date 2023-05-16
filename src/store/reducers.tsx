import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import { AuthState, AuthAction } from '../types';
import { SET_USERNAME, SET_PASSWORD, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST } from '../actions';

const initialState: AuthState = {
    username: '',
    password: '',
    isLoggedIn: false,
    error: null,
};

const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case SET_USERNAME:
            return {
                ...state,
                username: action.payload.username,
            };
        case SET_PASSWORD:
            return {
                ...state,
                password: action.payload.password,
            };
        case LOGIN_REQUEST:
            // Logique de traitement pour l'action LOGIN_REQUEST
            // Par exemple, j'effectue l'appel à l'API pour l'authentification, mais dans le cas de redux-saga, j'utilise les sagas pour gérer les call API

            // Je retourne le nouvel état avec les modifications appropriées
            return {
                ...state,
                isLoggedIn: false,
                error: null,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                error: null,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                error: action.payload.error,
            };
        default:
            return state;
    }
};


const rootReducer = combineReducers({
    auth: authReducer,
    itemsReducer: cartReducer,
});

export default rootReducer;
