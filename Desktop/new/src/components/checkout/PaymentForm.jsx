import React from 'react';
import { Typography, Button, Divider } from '@mui/material';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

import Review from './Review';

const PaymentForm = ({ checkoutToken, nextStep, backStep, shippingData, onCaptureCheckout }) => {
  const orderData = {
    public_key: process.env.REACT_APP_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: checkoutToken.live.subtotal.formatted_with_symbol,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    line_items: checkoutToken.live.line_items,
    customer: {
      firstname: shippingData.firstName,
      lastname: shippingData.lastName,
      email: shippingData.email,
      phonenumber: shippingData.phoneNumber,
    },
    shipping: { name: 'International', street: shippingData.address1, town_city: shippingData.city, county_state: shippingData.shippingSubdivision, postal_zip_code: shippingData.zip, country: shippingData.shippingCountry },
    fulfillment: { shipping_method: shippingData.shippingOption },
    payment: {
      gateway: 'manual',
      manual: {
        id: 'gway_J5avm26mEQb9lE',
      },
    },
    customizations: {
      title: 'my Payment Title',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };
  onCaptureCheckout(checkoutToken.id, orderData);
  nextStep();
  const handleFlutterPayment = useFlutterwave(orderData);

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
      <form>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" onClick={backStep}>Back</Button>
          <Button
            type="submit"
            variant="contained"
            // disabled={!stripe}
            color="primary"
            onClick={() => {
              handleFlutterPayment({
                callback: (response) => {
                  console.log(response);
                  closePaymentModal(); // this will close the modal programmatically
                },
                onClose: () => {},
              });
            }}
          >
            Pay
          </Button>
        </div>
      </form>
    </>
  );
};

export default PaymentForm;
