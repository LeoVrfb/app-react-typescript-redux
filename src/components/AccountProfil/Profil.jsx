import React from 'react'
import { Link } from 'react-router-dom'
import profileUser from "./profileUser.svg"
import './Profil.css'


const Profil = () => {
    return (
        <Link to="/login">
            <div className='floating-profil'>
                <p className='para'>Votre compte</p>
                <div className='img-notif-container'>
                    <img src={profileUser} alt="account" />
                </div>
            </div>
        </Link>
    )
}

export default Profil
