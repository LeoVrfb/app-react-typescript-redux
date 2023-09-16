import React, { useEffect } from 'react'
import cartIcon from "./shopping-cart.svg"
import "./FloatingCart.css"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { fetchItemsCart } from '../../actions'


export default function FloatingCart() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchItemsCart());
    }, [dispatch]);

    const shoppingCart = useSelector(state => state.auth.cart)

    let totalItems = 0;
    for (const item of shoppingCart) {
        totalItems += item.quantity;
    }

    return (
        <Link to="/shoppingCart">
            <div className='floating-cart'>
                <p>Votre panier</p>
                <div className='img-notif-container'>
                    <img src={cartIcon} alt="Icône cadi" />
                    <span className='notif'>{totalItems}</span>
                </div>
            </div>
        </Link>
    )
}