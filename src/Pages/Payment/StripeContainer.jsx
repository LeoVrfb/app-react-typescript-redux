import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';


const PUBLIC_KEY = 'pk_test_51JYtYbIL8dQdr5mxhJlf2gO5DXPt5nrTFj07a6zSDUmcFtci7Kps7ga1fuKxfdnMa1Bpg3biffNpi2snZXE9YQb500Zq7ZopJg';

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
    return (
        <Elements stripe={stripeTestPromise}>
            <CheckoutForm />
        </Elements>
    )
}

export default StripeContainer
