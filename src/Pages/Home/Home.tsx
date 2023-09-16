import React from 'react'
import './Home.css'
import imgHomeShop from './shopimg.jpg'

export default function Home() {

    return (
        <div className="global-container">
            <h1 className='home-title'>
                Bienvenue au <span>Shop</span>
            </h1>
            <p>Veuillez vous connecter !</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur amet mollitia aliquid atque voluptate commodi. Itaque cumque, numquam libero nulla, voluptatum nisi fugit iure, odit sed iste sit a culpa!</p>
            <img src={imgHomeShop} alt="accueil shop" />
        </div>
    )
}