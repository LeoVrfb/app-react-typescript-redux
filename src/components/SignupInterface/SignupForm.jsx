import React, { useEffect } from 'react';
import './SignupForm.css';
import { setPasswordSignUp, setUsernameSignUp, signupRequest } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = () => {
    const usernameSignup = useSelector((state) => state.auth.usernameSignup);
    const passwordSignup = useSelector((state) => state.auth.passwordSignup);
    const isSignup = useSelector((state) => state.auth.isSignup);
    const errorSignup = useSelector((state) => state.auth.errorSignup);



    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(signupRequest(usernameSignup, passwordSignup));

    };
    useEffect(() => {
        if (isSignup) {
            navigate('/signupmessage');
        }
    }, [isSignup, navigate]);

    console.log(isSignup)




    const handleUsernameChange = (e) => {
        dispatch(setUsernameSignUp(e.target.value));
    };

    const handlePasswordChange = (e) => {
        dispatch(setPasswordSignUp(e.target.value));
    };
    console.log(errorSignup)

    return (
        <div className='global-container'>

            <h2 className='form-heading'>Inscrivez-vous en entrant vos informations :</h2>


            <form onSubmit={handleFormSubmit}>
                <label htmlFor="email" className='form-label'>Email :</label>
                <input type="email" value={usernameSignup} onChange={handleUsernameChange} className='form-input' />

                <label htmlFor="password" className='form-label'>Mot de passe :</label>
                <input type="password" value={passwordSignup} onChange={handlePasswordChange} className='form-input' />

                <button className='form-button' type="submit">Valider</button>
                {errorSignup && <p>{JSON.stringify(errorSignup)}</p>}

                <Link to="/login">Vous êtes déjà inscrit ? Connectez-vous ici</Link>
            </form>
        </div>
    );
};

export default SignupForm;

/* <label htmlFor="name" className='form-label'>Nom :</label>
            <input type="text" value={name} onChange={handleUsernameChange} className='form-input' /> */

/* <label htmlFor="surname" className='form-label'>Prénom :</label>
            <input type="text" value={surname} onChange={e => setSurname(e.target.value)} className='form-input' /> */

/* <label htmlFor="idname" className='form-label'>Nom d'utilisateur :</label>
            <input type="text" value={idname} onChange={e => setIdname(e.target.value)} className='form-input' /> */

