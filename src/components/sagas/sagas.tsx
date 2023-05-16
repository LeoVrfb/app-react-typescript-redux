import { takeLatest, call, put } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { loginSuccess, loginFailure, LOGIN_REQUEST } from '../../actions';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Import des méthodes d'authentification nécessaires depuis Firebase
// import { collection, getDocs, QuerySnapshot } from 'firebase/firestore';

import { app } from '../../FbConfig';


function* login(action: AnyAction) {
    const { username, password } = action.payload;
    try {
        const auth = getAuth(app);

        // J'effectue ici mon appel asynchrone pour la connexion avec Firebase
        yield call(signInWithEmailAndPassword, auth, username, password);

        // Je dispatche une action de succès
        yield put(loginSuccess());
    } catch (error: any) {
        // Je gère les erreurs d'authentification Firebase
        const errorMessage = error.message;

        // Je dispatch une action d'échec avec l'erreur
        yield put(loginFailure(errorMessage));
    }
}

export default function* authSaga() {
    yield takeLatest(LOGIN_REQUEST, login);
}


// const querySnapshot: QuerySnapshot = yield call(() => getDocs(collection(db, 'users')));

        // // Faites ici votre traitement avec les données récupérées
        // querySnapshot.forEach((doc) => {
        //     console.log(doc.id, '=>', doc.data());
        // });