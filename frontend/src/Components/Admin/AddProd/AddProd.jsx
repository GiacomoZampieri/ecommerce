import './AddProd.css'
import { useState } from 'react'
import upload_area from '../../Assets/upload_area.svg'

const AddProd = () => {
  
    const [image,setImage] = useState(false);
    const [productDetails,setProductDetails] = useState({
        brand:"",
        description:"",
        image:"",
        category:"donna",
        price:"",
        tags:""
    });

    const [added,setAdded] = useState(false);
    const [error,setError] = useState("");

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const changeHandler = (e) => {
        setProductDetails({...productDetails,[e.target.name]:e.target.value});
    }

    const addProduct = async () => {

        let responseData;
        let product = productDetails;

        let formData = new FormData();

        formData.append('product',image);

        await fetch('http://localhost:4000/upload',{
            method: "POST",
            headers:{
                Accept: 'application/json'
            },
            body:formData,
        }).then((resp) => resp.json()).then((data) => {
            if (data.success) {
                responseData = data;
            } else {
                alert('Inserisci una foto');
                responseData = data;
            }
        })

        if(responseData.success){

            product.image = responseData.image_url;

            console.log(product);

            await fetch('http://localhost:4000/addproduct',{
                method: "POST",
                headers:{
                    Accept: 'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(productDetails),
            }).then((resp) => resp.json()).then((data) => {
                data.success ? setAdded(true) : setError(data.errors);
            })
        }
    }

  return (
    <div className="addProduct">
        <div className="addProductInput">
            <p>Brand</p>
            <input value={productDetails.brand} onChange={changeHandler} type="text" name='brand' placeholder='Inserisci il brand del prodotto...' required='true'/>
        </div>
        <div className="addProductInput">
            <p>Descrizione</p>
            <input value={productDetails.description} onChange={changeHandler} type="text" name='description' placeholder='Inserisci la descrizione del prodotto...' required='true'/>
        </div>
        <div className="addProductInput">
            <p>Prezzo</p>
            <input value={productDetails.price} onChange={changeHandler} type="text" name="price" placeholder='Inserisci il prezzo del prodotto...' required='true'/>
        </div>
        <div className="addProductInput">
            <p>Categoria</p>
            <select value={productDetails.category} onChange={changeHandler} name="category"  className='addProductSelect'>
                <option value="donna">Donna</option>
                <option value="uomo">Uomo</option>
                <option value="bambino">Bambino</option>
            </select>
        </div>
        <div className="addProductInput">
            <p>Tags</p>
            <input value={productDetails.tags} onChange={changeHandler} type="text" name='tags' placeholder='Inserisci i tags del prodotto...' />
        </div>
        <div className="addProductInput">
            <label htmlFor="file-input">
                <img src={image? URL.createObjectURL(image) : upload_area} alt="" className="addProductImage"/>
            </label>
            <input onChange={imageHandler} type="file" name='image' id='file-input' hidden required='true'/>
        </div>
        <button onClick={addProduct} className="addProductButton">AGGIUNGI PRODOTTO</button>
        {added ? <p className='addedState'>Prodotto aggiunto correttamente!</p>: <p className='addedState'>{error}</p>}
    </div>
  )
}

export default AddProd;