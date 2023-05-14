import { combineReducers } from 'redux';
import { AuthState, AuthAction } from '../types';
import { SET_USERNAME, SET_PASSWORD, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions';



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
});

export default rootReducer;
