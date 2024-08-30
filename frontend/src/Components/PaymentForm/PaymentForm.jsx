import React, { useContext, useRef } from 'react'
import emailjs from '@emailjs/browser';
import { useNavigate } from "react-router-dom";
import {ShopContext} from '../../Context/ShopContext'
import './PaymentForm.css'

const PaymentForm = () => {

  const form = useRef();

  let navigate = useNavigate(); 

  const routeChange = () =>{ 
    let path = `/greetings`; 
    navigate(path);
  }

  const {removeAllCartItems} = useContext(ShopContext);

  const sendEmail = (e) => {

    e.preventDefault();

    emailjs
      .sendForm('service_1k41ewz', 'template_32v0tll', form.current, {
        publicKey: 'LhkD8g18TjGphMuOn',
      })
      .then(
        () => {
          routeChange();

          removeAllCartItems();
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  const email = localStorage.getItem('email');
  const username = localStorage.getItem('username');
  
  return (
    <div>
      <form ref={form} onSubmit={sendEmail} className='paymentForm'>
      <div className="paymentFormInput">
          <label>Username</label>
          <input type="text" name="user_name" value={username}/>
        </div>
        <div className="paymentFormInput">
          <label>Email</label>
          <input type="email" name="user_email" value={email}/>
        </div>
        <div className="paymentFormInput">
          <label>Numero Carta</label>
          <input type="text" name="cart_number" placeholder="1234 5678 9101 1121" required/>
        </div>
        <div className="paymentFormInput">
          <label>Data di scadenza</label>
          <input type="text" name="cart_date" placeholder="MM/AA" required />
        </div>
        <div className="paymentFormInput">
          <label>Codice di sicurezza (CVV)</label>
          <input type="text" name="cvv" placeholder="123" required/>
        </div>
        <input type="submit" value="PROCEDI CON IL PAGAMENTO"  className='paymentFormInputSubmit' /> 
      </form>
    </div>
  )
}

export default PaymentForm