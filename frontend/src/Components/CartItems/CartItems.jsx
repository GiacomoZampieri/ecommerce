import React, { useContext } from 'react'
import './CartItems.css'
import {ShopContext} from '../../Context/ShopContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'

const CartItems = () => {

    const {all_product,cartItems,removeFromCart,getTotalCartAmount} = useContext(ShopContext);

  return (
    <div className="cartItems">
        <div className="cartItemsFields">
            <p>PRODOTTI</p>
            <p>BRAND</p>
            <p>TAGLIA</p>
            <p>PREZZO</p>
            <p>QUANTITA</p>
            <p>TOTALE</p>
        </div>
        <hr />
        <div>
            {all_product.map((e) => {
                if(cartItems[e.id] > 0){
                    return(
                        <div>
                            <div className="cartItemsSingle cartItemsFields">
                                <img src={e.image} alt="" className='cartItemsProductImage'/>
                                <p>{e.brand}</p>
                                <p>{e.size}</p>
                                <p>{e.price} €</p>
                                <button className='cartItemsQuantity'>{cartItems[e.id]}</button>
                                <p>{e.price * cartItems[e.id]} €</p>
                                <FontAwesomeIcon className='cartItemsRemoveIcon' icon={faXmark} onClick={() => {removeFromCart(e.id)}} />
                            </div>
                        </div>
                    );
                }

                return null;
            })} 
        </div>
        <div className='cartitems-down'>
            <div className="cartitems-total">
                <h1>Cart Totals</h1>
                <div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>{getTotalCartAmount()} €</h3>
                    </div>
                </div>
                <Link to='/payment' ><button>PROCEED TO PAYMENT</button></Link>
            </div>
        </div>
    </div>
  )
}

export default CartItems