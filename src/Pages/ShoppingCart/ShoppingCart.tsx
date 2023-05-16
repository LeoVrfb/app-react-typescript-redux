import React from 'react'
import "./ShoppingCart.css"
import { useSelector, useDispatch } from 'react-redux'

export default function ShoppingCart() {

    const storeState: any = useSelector((state: any) => state.itemsReducer);

    const dispatch = useDispatch()



    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: any) => {
        const indexItem = storeState.cart.findIndex((obj: any) => obj.id === id)

        const updatedQuantity = Number(event.target.value);

        if (updatedQuantity <= 0) {
            return; // Empêche la mise à jour de la quantité si elle est inférieure ou égale à zéro
        }
        const objUpdated = {
            ...storeState.cart[indexItem],
            quantity: updatedQuantity
        }

        dispatch({
            type: "UPDATEITEM",
            payload: objUpdated
        })
    }

    const removeItem = (id: number) => {
        dispatch({
            type: "REMOVEITEM",
            payload: id
        });
    };

    let totalPrice = 0;
    if (storeState.cart.length !== 0) {
        for (const item of storeState.cart) {
            const itemPrice = item.price * item.quantity;
            totalPrice += itemPrice;
        }
    }


    return (
        <div className='global-container'>
            <p className='heading-cart'>votre panier</p>
            <ul className="cart-list">
                {storeState.cart.map((item: any) => (
                    <li key={item.id}>
                        <img src={process.env.PUBLIC_URL + `/images/${item.img}.png`}
                            alt="" />
                        <div className="bloc-cart-infos">
                            <h4>{item.title}</h4>
                            <p>Price: {item.price}€</p>
                        </div>
                        <div className='bloc-input'>
                            <label htmlFor="quantityInput">Quantité</label>
                            <input
                                onChange={e => handleChange(e, item.id)}
                                type="number"
                                id="quantityInput"
                                value={item.quantity} />
                        </div>

                        <button onClick={() => removeItem(item.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>

            <p className="total-price">Total : {totalPrice.toFixed(2)} €</p>
            <button className='btn-cart'>Procéder au paiement</button>

        </div>
    )
}