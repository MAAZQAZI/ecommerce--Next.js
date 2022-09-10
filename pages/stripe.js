import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './form';
import Form from './form';


const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const    Home=({total})=> {
   const T=total;
    
    
    console.log('stripe me total :'+((T)))
    
  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntent, setPaymentIntent] = useState('');
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads using our local API
   
    fetch('api/stripe_intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: 30000,
        payment_intent_id: '',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.client_secret), setPaymentIntent(data.id);
      });
     
  }, []);

  const appearance = {
    theme: 'stripe',
    labels: 'floating',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className='m-auto'>
       <Head>
      <title>Payment - NextStore</title>
      <meta name="description" content="NextStore.com - Get the best" />
      <link rel="icon" href="/favicon.ico" />
   </Head>
      <h1 className="text-2xl bold mb-4 mt-4 text-center">
        Accept payments with credit card
      </h1>
      <div className="flex justify-center m-auto w-1/2">
        <div className="w-1/3 flex justify-start items-center">
          <img src="/stripe.svg" alt="Stripe" />
        </div>
        <div className="w-1/3 flex justify-center items-center text-4xl bold">
          +
        </div>
        <div className="w-1/3 flex justify-end items-center">
          <img src="/vercel.svg" alt="Stripe" />
        </div>
      </div>
      {clientSecret && (
        <Elements options={options} stripe={stripe}>
          <CheckoutForm paymentIntent={paymentIntent} T={T}  />
          {/* <Form T={T}/> */}
        </Elements>
      )}
    </div>
  );
}
export default  Home