import { all } from 'redux-saga/effects';
import authSaga from './sagas';
// Importez d'autres sagas si nécessaire

export default function* rootSaga() {
    yield all([
        authSaga(),
        // Les autres sagas ici
    ]);
}
