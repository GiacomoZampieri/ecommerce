import React, { useEffect, useState } from 'react'
import Item from '../Items/Item'
import './NewCollections.css'

const NewCollections = () => {

    const [new_collection,setNewCollection] = useState([]);

    useEffect(() => {
      fetch('http://localhost:4000/newcollections').then((response) => response.json()).then((data) => setNewCollection(data));
    },[]);

  return (
    <div className="newCollections">
      {new_collection.map((item,i) => {
        return <Item key={i} id={item.id} brand={item.brand} description={item.description} image={item.image} price={item.price} category={item.category}/>
      })}
    </div>
  )
}

export default NewCollections