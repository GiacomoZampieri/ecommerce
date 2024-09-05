import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

const Item = (props) => {
  return (
    <div className="item">
      <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt="" /></Link>
      <p className='brand'>{props.brand}</p>
      <p className='description'>{props.description} {props.category}</p>
      <div className="itemPrice">
        <p>{props.price} €</p>
      </div>
    </div>
  )
}

export default Item;