import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import './Payment.css'
import { number, expirationMonth, expirationYear } from 'card-validator';




const stripePromise = loadStripe('pk_test_51JYtYbIL8dQdr5mxhJlf2gO5DXPt5nrTFj07a6zSDUmcFtci7Kps7ga1fuKxfdnMa1Bpg3biffNpi2snZXE9YQb500Zq7ZopJg');

function PaymentForm() {
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCVV] = useState('');
    const [cardNameError, setCardNameError] = useState('');
    const [cardNumberError, setCardNumberError] = useState('');
    const [expiryDateError, setExpiryDateError] = useState('');
    const [cvvError, setCVVError] = useState('');
    const [clientSecret, setClientSecret] = useState('');




    const stripe = useStripe();
    const elements = useElements();




    const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        // Supprimer tous les caractères non numériques de la valeur
        value = value.replace(/\D/g, '');

        // Ajouter automatiquement le slash après le mois (si nécessaire)
        if (value.length >= 2) {
            value = value.replace(/^(\d{2})/, '$1/');
        }

        setExpiryDate(value);
    };

    const handleCardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const cleanedValue = value.replace(/[^a-zA-Z\s]/g, '');
        setCardName(cleanedValue);
    };

    const validateCVV = (cvv: any, cardType: any) => {
        // Validation du code CVV
        // ...

        // Exemple de validation de longueur et de type de caractères
        const cvvLength = cardType === 'amex' ? 4 : 3;
        const numericRegex = /^[0-9]+$/;

        if (!cvv || cvv.length !== cvvLength || !numericRegex.test(cvv)) {
            return false;
        }

        return true;
    };

    useEffect(() => {
        // Effectuez votre requête pour obtenir le clientSecret du serveur
        // Assurez-vous d'adapter cette requête à votre architecture et à votre logique de serveur
        fetch('/votre-endpoint-pour-obtenir-le-client-secret')
            .then((response) => response.json())
            .then((data) => {
                setClientSecret(data.clientSecret); // Stockez le clientSecret dans l'état de votre composant
            });
    }, []);
    console.log('hello');


    const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const cardValidation = number(cardNumber.trim());
        if (!cardValidation.isPotentiallyValid || !cardValidation.isValid) {
            setCardNumberError('*Numéro de carte de crédit invalide');
        }
        else {
            setCardNumberError('')
        }

        const [month, year] = expiryDate.split('/');
        const monthValidation = expirationMonth(month);
        const yearValidation = expirationYear(year);

        if (!monthValidation.isValid || !yearValidation.isValid) {
            setExpiryDateError('*Date de carte de crédit invalide');
        }
        else {
            setExpiryDateError('')
        }
        // Le numéro de carte de crédit est valide, procéder à la validation du code CVV
        const cardType = cardValidation.card?.type;
        const isValidCVV = validateCVV(cvv, cardType);
        if (!isValidCVV) {
            setCVVError('*Code CVV invalide');
            return;
        }
        else {
            setCVVError('')
        }

    };



    return (

        <div className="payment-form">
            <h2>Interface de paiement</h2>
            <form onSubmit={handlePayment}>
                <label htmlFor="cardNumber">Numéro de carte</label>
                <input
                    type="text"
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                />
                {cardNumberError && <p className="error-message">{cardNumberError}</p>}
                <label htmlFor="cardName">Nom du titulaire de la carte</label>
                <input
                    type="text"
                    id="cardName"
                    value={cardName}
                    onChange={handleCardNameChange}
                    required
                />
                {cardNameError && <p>{cardNameError}</p>}

                <label htmlFor="expiryDate">Date d'expiration</label>
                <input
                    type="text"
                    id="expiryDate"
                    value={expiryDate}
                    onChange={handleExpiryDateChange}
                    inputMode="numeric"
                    maxLength={7}
                    pattern="\d\d/\d{4}"
                    placeholder="MM/YYYY"
                    required
                />
                {expiryDateError && <p className="error-message">{expiryDateError}</p>}

                <label htmlFor="cvv">CVV</label>
                <input
                    type="text"
                    id="cvv"
                    value={cvv}
                    onChange={(e) => setCVV(e.target.value)}
                    required
                />
                {cvvError && <p>{cvvError}</p>}

                <button type="submit">Payer</button>
            </form>
        </div>
    );
}



export default function Payment() {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    );
}



