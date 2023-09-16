import React from 'react'
import { Link } from 'react-router-dom'

import './Navbar.css'
import { useSelector } from 'react-redux'

const Menu = () => {

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

    return (
        <nav className='nav-top'>
            <Link to="/" >ACCUEIL</Link>
            <Link to="/produits">PRODUITS</Link>
            <Link to="/contact">CONTACT</Link>
            <Link to={isLoggedIn ? "./dashboard" : "./signup"}>CONNEXION</Link>

        </nav>
    )
}

export default Menu
