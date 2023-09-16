import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {
    apiKey: 'AIzaSyB1BeKhiHriXVOYHh75zYVHMg6ArkkrdTI',
    authDomain: 'react-tp-redux-app.firebaseapp.com',
    databaseURL: 'https://react-tp-redux-app-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'react-tp-redux-app',
    storageBucket: 'react-tp-redux-app.appspot.com',
    messagingSenderId: '361699814533',
    appId: '1:361699814533:web:f131e631a56cf03cadcdec',
    measurementId: 'G-LH6XB5NS5E',
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);


