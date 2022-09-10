import React, { useEffect, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
  CardElement,
} from '@stripe/react-stripe-js';
import Head from 'next/head'

const Form=({paymentIntent,T})=> {
   
    console.log('form me cart :'+T)

    const total=T.toString();
    console.log(typeof(total));
const disabled='disabled'
  const [email, setEmail] = useState('');
  const [locAmount, setLocAmount] = useState(total);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
   useEffect(() => {
    setLocAmount(total)
    handleAmount(total)
    }, [T])
  useEffect(() => {
    if (!stripe) {
      return;
    }

    //Grab the client secret from url params
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {

      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleAmount = async (val) => {
    setLocAmount(val);
    console.log('handleamount me: '+val)
    console.log('handleamount me: '+(typeof(val)))
   
    fetch('api/stripe_intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: val,
        payment_intent_id: paymentIntent.paymentIntent,
        
      })
    });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.log('not loaded');
      // Stripe.js has not yet loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_HOST}/orders`,
        receipt_email: email,
        shipping: {
          address: { city: 'Kasur' },
          name: 'dot nnet',
        },
        payment_method_data: {
          billing_details: {
            name: 'qazi maaz',
          },
        },
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occured.');
    }

    setIsLoading(false);
   
  };

  return (
    <>
    <div className=' grid items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-200'>
    <Head>
      <title>Payment - NextStore</title>
      <meta name="description" content="NextStore.com - Get the best" />
      <link rel="icon" href="/favicon.ico" />
   </Head>
      <form id="payment-form" onSubmit={handleSubmit} className="m-auto">
        <div className="mb-3">
          Cart Total:
          <input
            id="amount"
            type="text"
            value={locAmount}
            
            className="block
            
            w-full
            rounded-md
            
            border-gray-300
            shadow-sm h-16
            p-2"
            

            placeholder="Enter email address"
          />
        </div>
        <div className="mb-6">
          Email address:
          <input
            className="block
            w-full
            rounded-md
            border-gray-300
            shadow-sm h-16
            p-2"
            
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
          />
        </div>
        <PaymentElement id="payment-element" />
        <button
          className="flex mr-2 mt-1 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          disabled={isLoading || !stripe || !elements}
          id="submit"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              'Pay now'
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
      </div>
    </>
  );
}

export default Form