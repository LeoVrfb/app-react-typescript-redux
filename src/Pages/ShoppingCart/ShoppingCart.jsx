import React, { useEffect, useState } from 'react'
import "./ShoppingCart.css"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchItemsCart, setCartPrice, setIsFromPayment, updateQuantityItemCart } from '../../actions';


export default function ShoppingCart() {

    const inventoryCart = useSelector((state) => state.auth.cart);
    const [myCart, setMyCart] = useState(inventoryCart);
    const cartPrice = useSelector((state) => state.auth.cartPrice);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [objUpdated, setObjUpdated] = useState({});
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchItemsCart());
    }, [dispatch]);


    let totalPrice = 0;
    if (myCart.length !== 0) {
        for (const item of myCart) {
            const itemPrice = item.price * item.quantity;
            totalPrice += itemPrice;
        }

    }

    const handleChange = (e, documentId) => {
        const indexItem = myCart.findIndex((obj) => obj.documentId === documentId)

        const value = Number(e.target.value);

        const updateItems = () => {
            if (value <= 1) {
                return 1
            }
            else if (value >= myCart[indexItem].stock) {
                return myCart[indexItem].stock
            }
            else {
                return value
            }
        }
        setObjUpdated({
            ...myCart[indexItem],
            quantity: updateItems(),
        });
        setMyCart([{ ...myCart[indexItem], quantity: updateItems() }]);
    }







    const removeItem = (documentId) => {
        dispatch({
            type: "REMOVEITEM",
            payload: documentId
        });
    };



    const navigate = useNavigate();


    const handlePaymentButtonClick = () => {


        // dispatch({
        //     type: "UPDATEITEM",
        //     payload: objUpdated
        // })
        dispatch(setCartPrice(totalPrice));
        isLoggedIn ? navigate('/stripecontainer') : navigate('/login');
        dispatch(setIsFromPayment());

        if (objUpdated) {
            dispatch(updateQuantityItemCart(objUpdated));
        }
    };




    return (
        <div className='global-container'>
            <p className='heading-cart'>votre panier</p>
            <ul className="cart-list">
                {myCart.map((item) => (
                    <li key={item.documentId}>
                        <img src={process.env.PUBLIC_URL + `/images/${item.img}.png`}
                            alt="" />
                        <div className="bloc-cart-infos">
                            <h4>{item.title}</h4>
                            <p>Price: {item.price}€</p>
                        </div>
                        <div className='bloc-input'>
                            <label htmlFor="quantityInput">Quantité</label>
                            <input
                                onChange={e => handleChange(e, item.documentId)}
                                type="number"
                                id="quantityInput"
                                value={objUpdated.quantity ? objUpdated.quantity : item.quantity} />
                        </div>

                        <button onClick={() => removeItem(item.documentId)}>Supprimer</button>
                    </li>
                ))}
            </ul>

            <p className="total-price">Total : {totalPrice.toFixed(2)} €</p>
            <button className="btn-cart" onClick={handlePaymentButtonClick}>
                Procéder au paiement {totalPrice} EUR
            </button>
            <p>Assurez-vous d'être connecter avant de procéder au paiement</p>

        </div>
    )
}