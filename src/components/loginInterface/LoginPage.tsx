import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUsername, setPassword, loginRequest, loginFailure } from '../../actions';


const LoginPage = () => {
    const navigate = useNavigate();
    const username = useSelector((state: any) => state.auth.username);
    const password = useSelector((state: any) => state.auth.password);
    const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
    const error = useSelector((state: any) => state.auth.error);


    const dispatch = useDispatch();

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginRequest(username, password));

    };
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/dashboard');
        }
    }, [isLoggedIn, navigate]);


    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setUsername(e.target.value));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPassword(e.target.value));
    };

    return (
        <div className="global-container">
            <h2 className='home-title'>Connexion</h2>
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
                {error && <p>{error.toString()}</p>}
            </form>
        </div>
    );
};

export default LoginPage;
