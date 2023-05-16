import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';


const firebaseConfig = {
    apiKey: 'AIzaSyB1BeKhiHriXVOYHh75zYVHMg6ArkkrdTI',
    projectId: 'react-tp-redux-app'

    // Ajoutez les clés d'API et les informations de votre projet Firebase ici
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Exportez db pour pouvoir l'utiliser dans d'autres parties de votre application
export { db, app };
