import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import icon from '../assets/icon.svg'

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51RKe9AReO8ahErvEGY8clWTQ5cgOVFRfBzhIfyULQUygGniBxrXRwHIpefZr8qrMKvGTNzeU8ZCiOK4tr0tF7k2f00DVklTCYQ';

  const onToken = token => {
    console.log(token);
    alert('Payment Succesful!');
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='E-Commerce'
      billingAddress
      shippingAddress
      image={icon}
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;