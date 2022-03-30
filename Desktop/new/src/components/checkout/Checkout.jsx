import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, CircularProgress, Divider } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import './Checkout.css'

import commerce from '../../lib/commerce';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, onCaptureCheckout, order, error }) => {
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const history = useHistory();

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  useEffect(() => {
    if (cart.id) {
      const generateToken = async () => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });

          setCheckoutToken(token);
        } catch {
          if (activeStep !== steps.length) history.push('/');
        }
      };

      generateToken();
    }
  }, [cart]);

  const test = (data) => {
    setShippingData(data);

    nextStep();
  };

  let Confirmation = () => (order.customer ? (
    <>
      <div className='confirmation'>
        <h5>Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</h5>
        <Divider className='divider' />
        <strong>Order ref: {order.customer_reference}</strong>
      </div>
      <br />
      <button className='btn' component={Link} variant="outlined" type="button" to="/">Back to home</button>
    </>
  ) : (
    <div className='spinner'>
      <CircularProgress />
    </div>
  ));

  if (error) {
    Confirmation = () => (
      <>
        <h5>Error: {error}</h5>
        <br />
        <button className='btn' component={Link} variant="outlined" type="button" to="/">Back to home</button>
      </>
    );
  }

  const Form = () => (activeStep === 0
    ? <AddressForm checkoutToken={checkoutToken} nextStep={nextStep} setShippingData={setShippingData} test={test} />
    : <PaymentForm checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout} />);

  return (
    <>
      <div className='toolbar' />
      <div className='layout'>
        <div className='paper'>
          <h2 align="center">Checkout</h2>
          <Stepper activeStep={activeStep} className='stepper'>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
        </div>
      </div>
    </>
  );
};

export default Checkout;
