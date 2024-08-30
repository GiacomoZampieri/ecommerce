import React, { useContext, useState, useEffect, useMemo } from 'react';
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import Item from '../Components/Items/Item'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'

const ShopCategory = (props) => {

  const { all_product } = useContext(ShopContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [errorMessage,setErrorMessage] = useState("");

  //Filtraggio dei prodotti in base alla categoria
  const categoryProducts = useMemo(() => {
    return all_product.filter(item => item.category === props.category);
  }, [all_product, props.category]);

  useEffect(() => {
    setSearchTerm('');
    setErrorMessage('');
  }, []);

  // Update results when categoryProducts or searchTerm changes
  useEffect(() => {
    if (searchTerm === '') {
      setResults(categoryProducts);
      setErrorMessage("");
    } else {
      const fetchFilteredResults = async () => {
        try {
          const response = await fetch(`http://localhost:4000/search?q=${searchTerm}&c=${props.category}`);
          if (response.ok) {
            const data = await response.json();
            
            if (data.length === 0) {
              setErrorMessage("Nessun elemento trovato");
              setResults([]);
            } else {
              setErrorMessage(""); // Resetta l'errore se vengono trovati elementi
              setResults(data);
            }
            
          } else {
            console.error('Errore nella risposta del server:', response.status);
          }
        } catch (err) {
          console.error('Errore durante il fetch dei dati:', err);
        }
      };

      // Debounce the fetch call
      const timeoutId = setTimeout(fetchFilteredResults, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [searchTerm, categoryProducts, props.category]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="shop-category">
      <div>
        <input
          type="text"
          placeholder="Cerca il brand..."
          value={searchTerm}
          onChange={handleChange}
          className='shopCategoryInput'
        />
        <div className="shopCategoryProducts">
          {results.map((item) => (
            <Item
              key={item._id}
              id={item.id}
              brand={item.brand}
              description={item.description}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
        {errorMessage.localeCompare("") ? <p className='shopCategoryNotFound' ><FontAwesomeIcon icon={faCircleExclamation}/> {errorMessage}</p> : <> </>}
      </div>
    </div>
  );
};

export default ShopCategory;