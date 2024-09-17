import React, { useState } from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {

  const [state,setState] = useState("Login");
  const [formData,setFormData] = useState({
    username:"",
    password:"",
    email:""
  });

  const [error,setError] = useState("");

  const changeHandler = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value});
  }

  const login = async () => {

    let responseData;

    await fetch('ecommerce-6k1a-m7l7t82zz-giacomozampieris-projects.vercel.app/login',{
      method:'POST',
      mode: 'no-cors', 
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData)
    }).then((response) => response.json()).then((data) => responseData = data);

    if(responseData.success){

      localStorage.setItem('auth-token',responseData.token);

      localStorage.setItem('email',responseData.user.email);

      localStorage.setItem('username',responseData.user.name);
      
      window.location.href = "https://ecommerce-6k1a.vercel.app/";
      
    }else{
      setError(responseData.errors);
    }
  }

  const signup = async () => {

    let responseData;

    await fetch('ecommerce-6k1a-m7l7t82zz-giacomozampieris-projects.vercel.app/signup',{
      method:'POST',
      mode: 'no-cors', 
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData)
    }).then((response) => response.json()).then((data) => responseData = data);

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);

      localStorage.setItem('email',responseData.user.email);

      localStorage.setItem('username',responseData.user.name);

      window.location.replace("/");
    }else{
      setError(responseData.errors);
    }
  }

  return (
    <div className="loginSignup">
      <div className="loginSignupContainer">
        <h1>{state}</h1>
        <div className="loginSignupFields">
          {state === "Sign Up" ? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Username...' required/> : <></>}
          <input type="email" name='email' value={formData.email} onChange={changeHandler} placeholder='Email...' required />
          <input type="password" name='password' value={formData.password} onChange={changeHandler} placeholder='Password...' required />
          <button onClick={() => {state === 'Login' ? login() : signup(); setError("")}}>{state}</button>
        </div>
        
        <p className='error'>{error}</p>
        {state === "Sign Up" 
        ? <p className="loginSignupLogin">Hai gia un account? <span onClick={() => {setState("Login");setError("")}} className='clickHere'>Clicca qui per il login</span></p> 
        : <p className="loginSignupLogin">Non hai ancora creato un account? <span onClick={() => {setState("Sign Up");setError("")}} className='clickHere'>Clicca qui</span></p>
        }
      </div>
    </div>
  )

}

export default LoginSignup

