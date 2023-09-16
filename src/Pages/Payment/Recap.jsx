import React from 'react'
import './Recap.css'
import { useSelector } from 'react-redux';

const Recap = () => {

    const items = useSelector((state) => state.itemsReducer);

    return (
        <div>
            <ul className="card-list">
                {items.cart.map((item) => (
                    <li key={item.id}>
                        <img src={process.env.PUBLIC_URL + `/images/${item.img}.png`}
                            alt="" />
                        <div>
                            <h4>{item.title}</h4>
                            <p>Price: {item.price}€</p>
                        </div>
                        <div className='bloc-input'>
                            <p>Quantité: {item.quantity}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Recap
