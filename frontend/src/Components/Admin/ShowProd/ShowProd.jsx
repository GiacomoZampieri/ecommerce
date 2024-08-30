import { useEffect, useState } from 'react'
import './ShowProd.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const ShowProd = () => {

  const [allproducts,setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts')
    .then((res) => res.json())
    .then((data) => {setAllProducts(data)});
  }

  useEffect(() => { //Viene eseguita ogni volta che si apre la pagina
    fetchInfo();
  },[])

  const removeProduct = async (id) => {
    await fetch('http://localhost:4000/removeproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({id:id})
    })

    await fetchInfo();
  }

  return (
    <div className="productsList">
      <h1>LISTA PRODOTTI</h1>
      <div className="productsListFields">
        <p>IMMAGINE</p>
        <p>Brand</p>
        <p>DESCRIZIONE</p>
        <p>PREZZO</p>
        <p>CATEGORIA</p>
        <p>Tags</p>
      </div>
      <div className="productsList-allProducts">
        <hr />
        {allproducts.map((product,index) => {
          return <><div key={index} className="productsListFields productsListFormat">
            <img src={product.image} alt="" className="productsListProductImage"/>
            <p>{product.brand}</p>
            <p>{product.description}</p>
            <p>{product.price} €</p>
            <p>{product.category}</p>
            <p>{product.tags}</p>
            <FontAwesomeIcon onClick={() => {removeProduct(product.id)}} className="productsListRemoveIcon" icon={faXmark} alt="" />
          </div>
          <hr />
          </>
        })}
      </div>
    </div>
  )
}

export default ShowProd;