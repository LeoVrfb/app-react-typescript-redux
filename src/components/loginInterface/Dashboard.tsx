import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    return (
        <div className='global-container'>
            Bienvenue dans le Dashboard, vous vous êtes connectés avec succès !
            <Link to='/administration'>
                Aller sur votre espace administration
            </Link>
        </div>
    )
}

export default Dashboard
