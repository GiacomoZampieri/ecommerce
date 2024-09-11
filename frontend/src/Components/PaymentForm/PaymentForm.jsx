import React, { useContext, useRef, useState } from 'react'
import emailjs from '@emailjs/browser';
import { useNavigate } from "react-router-dom";
import {ShopContext} from '../../Context/ShopContext'
import './PaymentForm.css'

const PaymentForm = () => {

  const form = useRef();
  let navigate = useNavigate(); 

  const {removeAllCartItems,all_product,cartItems} = useContext(ShopContext);

  const [error,setError] = useState("");

  const [paymentData,setPaymentData] = useState({
    cardNumber:"",
    cardDate:"",
    cvv:""
  });

  const changeHandler = (e) => {
    setPaymentData({...paymentData,[e.target.name]:e.target.value});
  }

  const routeChange = () =>{ 
    let path = `/greetings`; 
    navigate(path);
  }

  let allCartProducts = [];

  all_product.forEach((product) => {
    if(cartItems[product.id] > 0){
        allCartProducts.push(product);
    }
  });
   
  const purchasedProducts = allCartProducts.map(item => `Brand: ${item.brand}, Quantità: ${cartItems[item.id]}, Prezzo unitario: ${item.price}`).join('\n');

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

  const sendData = async (e) => {

    e.preventDefault();

    let responseData;

    console.log(paymentData);

    await fetch('http://localhost:4000/payment',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(paymentData)
    }).then((response) => response.json()).then((data) => responseData = data);

    if(responseData.success){

      sendEmail(e);
      
    }else{
      setError(responseData.errors);
      console.log(error);
    }
  
  };

  const email = localStorage.getItem('email');
  const username = localStorage.getItem('username');
  
  return (
    <div>
      <form ref={form} onSubmit={sendData} className='paymentForm'>
      <div className="paymentFormInput">
          <input type="hidden" name="user_name" value={username} readonly/>
        </div>
        <div className="paymentFormInput">
          <input type="hidden" name="user_email" value={email} readOnly/>
        </div>
        <div className="paymentFormInput">
          <label>Numero Carta</label>
          <input type="text" name="cardNumber" placeholder="1234 5678 9101 1121" value={paymentData.cardNumber}  onChange={changeHandler}/>
        </div>
        <div className="paymentFormInput">
          <label>Data di scadenza</label>
          <input type="text" name="cardDate" placeholder="MM/AA" value={paymentData.cardDate} onChange={changeHandler}/>
        </div>
        <div className="paymentFormInput">
          <label>Codice di sicurezza (CVV)</label>
          <input type="text" name="cvv" placeholder="123" value={paymentData.cvv} onChange={changeHandler}/>
        </div>
        <input type="hidden" name="purchased_products" value={purchasedProducts} />
        <input type="submit" value="PROCEDI CON IL PAGAMENTO"  className='paymentFormInputSubmit'/> 
        <p className="error">{error}</p>
      </form>
    </div>
  )
}

export default PaymentForm;