import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUsername, setPassword } from '../../actions';


const LoginPage = () => {
    const navigate = useNavigate();
    const username = useSelector((state: any) => state.auth.username);
    const password = useSelector((state: any) => state.auth.password);


    const dispatch = useDispatch();

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Effectuez ici la logique de validation et d'authentification
        // Remplacez cet exemple par votre propre logique

        // Exemple : Vérifier si les identifiants sont valides
        if (username === 'admin' && password === 'password') {
            // Rediriger vers la page de connexion réussie
            navigate('/dashboard');
        } else {
            // Gérer les erreurs d'authentification
            console.log('Identifiant ou mot de passe incorrect');
        }
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setUsername(e.target.value));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPassword(e.target.value));
    };

    return (
        <div>
            <h2>Connexion</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="username">Identifiant:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Mot de passe:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default LoginPage;
