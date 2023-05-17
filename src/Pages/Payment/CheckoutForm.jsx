import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import "./CheckoutForm.css"
import axios from 'axios';
import { useSelector } from 'react-redux';




const CheckoutForm = () => {

    const stripe = useStripe()
    const elements = useElements()

    const price = useSelector((state) => state.itemsReducer.cartPrice);
    const normalPrice = price.cartPrice * 100;

    const [cardName, setCardName] = useState('')
    const [cardNameError, setCardNameError] = useState('')

    const handleCardNameChange = (e) => {
        const value = e.target.value;
        const cleanedValue = value.replace(/[^a-zA-Z\s]/g, '');
        setCardName(cleanedValue);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });
        if (!error) {
            console.log("Token Généré: ", paymentMethod);
            // envoie du token au backend
            try {
                const { id } = paymentMethod;
                const response = await axios.post("http://localhost:8080/stripe/charge",
                    {
                        amount: normalPrice,
                        id: id,
                    });
                if (response.data.success)
                    console.log("payement réussi");
            }
            catch (error) {
                console.log("Erreur !", error);
            }
        }
        else {
            console.log(error.message)
        }
    }
    console.log(price.cartPrice)

    return (
        <form onSubmit={handleSubmit} className="payment-form">
            <div className="payment-header">
                <h2>Paiement sécurisé</h2>
                <p>Veuillez entrer les détails de votre carte de crédit pour effectuer le paiement.</p>
            </div>
            <div className="payment-body">
                <label htmlFor="cardName"></label>
                <input
                    type="text"
                    id="cardName"
                    value={cardName}
                    onChange={handleCardNameChange}
                    placeholder='Nom du titulaire de la carte'
                    required
                />
                {cardNameError && <p>{cardNameError}</p>}

                <div className="card-element-container">
                    <CardElement
                        options={{
                            hidePostalCode: true
                        }}
                    />
                </div>
            </div>
            <div className="payment-footer">
                <button className="payment-button">Payer</button>
            </div>
        </form>

    )
}

export default CheckoutForm
