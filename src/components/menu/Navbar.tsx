import React from 'react'
import { Link } from 'react-router-dom'

import './Navbar.css'

const Menu = () => {

    return (
        <nav className='nav-top'>
            <Link to="/" >ACCUEIL</Link>
            <Link to="/produits">PRODUITS</Link>
            <Link to="/contact">CONTACT</Link>
            <Link to="/connexion">CONNEXION</Link>
        </nav>
    )
}

export default Menu
