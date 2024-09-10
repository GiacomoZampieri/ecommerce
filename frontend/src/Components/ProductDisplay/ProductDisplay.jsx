import React, { useContext, useState} from 'react'
import './ProductDisplay.css'
import { ShopContext } from '../../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons'

const ProductDisplay = (props) => {

    const {product} = props;

    const {addToCart,all_product} = useContext(ShopContext);

    const [activeButton, setActiveButton] = useState(null);

    const [addState,setAddState] = useState(false);

    const handleButtonClick = (buttonIndex) => {
        setActiveButton(buttonIndex);
    };

    let navigate = useNavigate(); 

    const routeChange = () =>{ 
        let path = `/login`; 
        navigate(path);
    }

    const handleAddToCart = (id) => {
        if(localStorage.getItem('auth-token')){
            addToCart(id);

            setAddState(true);
        }else{
            routeChange();
        }
    }

    const setSize = (id,size) => {

       let itemInfo = all_product.find((product) => product.id === Number(id));

       itemInfo.size = size;

       console.log(itemInfo);

    }

  return (
    <div className="productDisplay">
        <div className='productDisplayLeft'>
            <div className="productDisplay-img">
                <img className='productDisplayImage' src={product.image} alt="" />
            </div>
        </div>
        <div className='productDisplayRight'>
            <h1>{product.brand}</h1>
            <div className="productDisplayRightDescription">
                <p>{product.description}</p>
            </div>
            <div className="productDisplayPrice">
                {product.price} €
            </div>
            {addState ? <p className='productDisplaySuccess'><FontAwesomeIcon className="successIcon" icon={faCircleCheck}/> Il prodotto è stato aggiunto correttamente al carrello!</p> : <></>}
            <div className="productDisplayRightSize">
                <h1>Seleziona la taglia</h1>
                <div className="productDisplayRightSizes">
                    <div style={{ backgroundColor: activeButton === 1 ? 'lightblue' : 'white' }} onClick={() => {setSize(product.id,"s"); handleButtonClick(1);setAddState(false)}}>S</div>
                    <div style={{ backgroundColor: activeButton === 2 ? 'lightblue' : 'white' }} onClick={() => {setSize(product.id,"m"); handleButtonClick(2);setAddState(false)}}>M</div>
                    <div style={{ backgroundColor: activeButton === 3 ? 'lightblue' : 'white' }} onClick={() => {setSize(product.id,"l"); handleButtonClick(3);setAddState(false)}}>L</div>
                    <div style={{ backgroundColor: activeButton === 4 ? 'lightblue' : 'white' }} onClick={() => {setSize(product.id,"xl"); handleButtonClick(4);setAddState(false)}}>XL</div>
                    <div style={{ backgroundColor: activeButton === 5 ? 'lightblue' : 'white' }} onClick={() => {setSize(product.id,"xxl"); handleButtonClick(5);setAddState(false)}}>XXL</div>
                </div>
            </div>
            <button onClick={() => {handleAddToCart(product.id); window.scrollTo(0,0)} } >AGGIUNGI AL CARRELLO</button>
            
            <p className='productDisplayRightTags'><span>Tags: </span>{product.tags}</p>
        </div>
    </div>
  )
}

export default ProductDisplay