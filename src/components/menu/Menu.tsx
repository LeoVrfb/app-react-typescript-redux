import React from 'react'
import { useNavigate } from 'react-router-dom';

import './Menu.css'

const Menu = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        // Naviguer vers l'interface de connexion
        navigate('/login');
    };
    return (
        <nav className='container'>
            <ul className='menu'>
                <li className='items'><a href="#">Accueil</a></li>
                <li className='items'><a href="#">À propos</a></li>
                <li className='items'><a href="#">Services</a></li>
                <li className='items'><a href="#">Contact</a></li>
            </ul>
            <button className="login-button" onClick={handleLoginClick}>Connexion</button>

        </nav>
    )
}

export default Menu
