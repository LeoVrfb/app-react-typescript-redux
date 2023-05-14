import { takeLatest, call, put } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { LOGIN_REQUEST, loginSuccess, loginFailure } from './actions';

interface LoginError {
    message: string;
    // Ajoutez d'autres propriétés si nécessaire
}

function* login(action: AnyAction) {


    const { username, password } = action.payload;
    try {
        // Effectuez ici votre appel asynchrone pour la connexion, par exemple à l'aide d'une API
        // Remplacez cet exemple par votre propre logique
        // const response = yield call(api.login, username, password);

        // Simulons une connexion réussie après 2 secondes
        yield new Promise((resolve) => setTimeout(resolve, 2000));

        // Dispatchez une action de succès
        yield put(loginSuccess());
    } catch (error) {
        const loginError = error as LoginError;
        // Dispatchez une action d'échec
        yield put(loginFailure(loginError.message));
    }
}

function* authSaga() {
    yield takeLatest(LOGIN_REQUEST, login);
}

export default authSaga;
