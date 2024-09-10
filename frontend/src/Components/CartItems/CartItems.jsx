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
                                <p className='cartItemsBrand'>{e.brand}</p>
                                <p className='cartItemsSize'>{e.size}</p>
                                <p className='cartItemsPrice'>{e.price} €</p>
                                <button className='cartItemsQuantity'>{cartItems[e.id]}</button>
                                <p className='cartItemsTotalPrice'>{e.price * cartItems[e.id]} €</p>
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
                <h1>Totale carrello: <span>{getTotalCartAmount()} </span>€</h1>
                <Link to='/payment' ><button>CONTINUA CON IL PAGAMENTO</button></Link>
            </div>
        </div>
    </div>
  )
}

export default CartItems