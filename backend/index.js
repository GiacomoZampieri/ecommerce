const port = 4000 || 8080;

require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");
const app = express();

const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS.split(',');

app.use(express.json());

app.use(cors({
    origin: allowedOrigins, 
}));

//DATABASE CONNECTION WITH MONGO DB
mongoose.connect(process.env.MONGO_URI)

//API CREATION

app.get("/",(req,res) => {
    res.send("Express App running");
});

//IMAGE STORE ENGINE WITH MULTER

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req,file,cb) => {
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({storage:storage});

//CREATING UPLOAD ENDPOINT FOR IMAGES
app.use('/images',express.static('upload/images'));

app.post("/upload",upload.single('product'),(req,res) => {

    if(req.file === undefined){
        return res.status(400).json({success:false,errors:"Inserisci la foto del prodotto"});
    }

    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    });
})

//SCHEMA FOR CREATING PRODUCTS

const Product = mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    brand:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    tags:{
        type:[String],
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    }
});

//API FOR adding PRODUCTS

app.post("/addproduct", async (req,res) => {

    let products = await Product.find({});

    let id;

    //Creating the id
    if(products.length > 0){
        let last_product_array = products.slice(-1);

        let last_product = last_product_array[0]; 

        id = last_product.id + 1;
    }else{
        id = 1;
    }

    if(req.body.brand === ''){
        return res.status(400).json({success:false,errors:"Inserisci il brand del prodotto"});
    }else if(req.body.description === ''){
        return res.status(400).json({success:false,errors:"Inserisci la descrizione del prodotto"});
    }else if(req.body.price  === ''){
        return res.status(400).json({success:false,errors:"Inserisci il prezzo del prodotto"});
    }

    //Create the product
    const product = new Product({
        id: id,
        brand: req.body.brand,
        description: req.body.description,
        image: req.body.image,
        tags: req.body.tags,
        category: req.body.category,
        price: req.body.price,
    });

    await product.save(); //save the product in mongo db

    //Response to the creation query
    res.json({
        success: true,
        name: req.body.name,
    });
})

//API FOR DELETING PRODUCTS

app.post('/removeproduct', async (req,res) => {

    await Product.findOneAndDelete({
        id:req.body.id
    });

    console.log("Removed");

    //Response to the deletion query
    res.json({
        success: true,
        name: req.body.name,
    });
});

app.post('/countproducts', async (req,res) => {

    const {category} = req.body;

    let count;

    try{
        if(category === undefined){
            count = await Product.countDocuments({});
        }else{
            count = await Product.countDocuments({category:category});
        }

        res.json({count});
    }catch (error) {
        res.status(500).json({ error: 'Errore' });
    }

});

//CREATING API FOR GETTING ALL PRODUCTS

app.get('/allproducts', async (req,res) => {

    let products = await Product.find({}); //get all products

    console.log("All products fetch");

    //Response to the deletion query
    res.send(products);

});

//ENDPOINT new collection

app.get('/newcollections', async (req,res) => {

    let products = await Product.find({});

    let newcollection = products.slice(1).slice(-8); //Prendo gli utlitmi 8 prodotti aggiunti

    newcollection = newcollection.reverse();

    res.send(newcollection);
})

//CREATE USER SCHEMA

const Users = mongoose.model('users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

//CREATE USER endpoint

app.post('/signup', async (req,res) => {

    console.log(req.body.email)

    if(req.body.username === ""){
        return res.status(400).json({success:false,errors:"Il campo username non può essere vuoto"});
    }else if(req.body.password === ""){
        return res.status(400).json({success:false,errors:"Il campo password non può essere vuoto"});
    }else if(req.body.email === ""){
        return res.status(400).json({success:false,errors:"Il campo email non può essere vuoto"});
    }

    let check = await Users.findOne({email:req.body.email});

    if(check){
        return res.status(400).json({success:false,errors:"E-mail gia in uso"});
    }

    let cart = {};

    for(let i = 0; i < 300; i++){
        cart[i] = 0;
    }

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })

    //Save user in db
    await user.save();

    //JWT authentication
    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom');

    res.json({success:true,token,user});
})

//ENDPOINT USER LOGIN

app.post('/login', async (req,res) => {

    const { email, password } = req.body;

    if (!email && !password) {
        return res.json({ success: false, errors: "Inserire email e password!" });
    }else if(!email){
        return res.json({ success: false, errors: "Inserire l'email!" });
    }else if(!password){
        return res.json({ success: false, errors: "Inserire la password!" });
    }

    let user = await Users.findOne({email:req.body.email});

    try {
        // Trova l'utente con l'email fornita
        let user = await Users.findOne({ email });

        if (user) {
            // Confronta la password fornita con la password hashata memorizzata
            const passCompare = password === user.password;

            if (passCompare) { // Se le password corrispondono
                // Crea un payload per il token JWT
                const data = {
                    user: {
                        id: user.id
                    }
                };

                // Firma il token JWT
                const token = jwt.sign(data, 'secret_ecom');

                // Invia una risposta di successo con il token e i dettagli dell'utente
                return res.json({ success: true, token, user });
            } else {
                // Password errata
                return res.json({ success: false, errors: "Password errata!" });
            }
        } else {
            return res.json({ success: false, errors: "Utente non trovato: email errata!" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, errors: "Errore del server!" });
    }
});


//Creating middleware to fetch user

const fetchUSer = async (req,res,next) => {

    const token = req.header('auth-token');

    if(!token){
        res.status(401).send({errors:"Please authenticate using valid token"})
    }else{
        try {
            const data = jwt.verify(token,'secret_ecom');

            req.user = data.user;

            next();
        } catch (error) {
            res.status(401).send({errors:"Please authenticate using valid token"});
        }
    }
}

//ENDPOINT for adding products in cartdata

app.post('/addtocart', fetchUSer, async (req,res) => {

    let userData = await Users.findOne({_id:req.user.id});

    userData.cartData[req.body.itemId] += 1;

    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});

    res.send("Added");
})

//ENDPOINT for remove products in cartdata

app.post('/removefromcart',fetchUSer, async (req,res) => {

    let userData = await Users.findOne({_id:req.user.id});

    if(userData.cartData[req.body.itemId] > 0){
        userData.cartData[req.body.itemId] -= 1;
    }

    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});

    res.send("Removed");
})

app.post('/removeallfromcart',fetchUSer, async (req,res) => {

    let userData = await Users.findOne({_id:req.user.id});

    for(const item in userData.cartData){
        userData.cartData[item] = 0;
    }

    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});

    res.send("Removed");
})

//ENDPOINT for get cartdata

app.post('/getcart',fetchUSer,async (req,res) => {

    let userData = await Users.findOne({_id:req.user.id});

    res.json(userData.cartData);
})

app.get('/search', async (req, res) => {

    const searchTerm = req.query.q;

    const category = req.query.c;

    try {
      const items = await Product.find({
        brand: { $regex: searchTerm, $options:'i'},
        category: category
      });
      res.json(items);
    } catch (err) {
      res.status(500).send(err);
    }
});

app.delete('/removeUser',async (req,res) => {

    try {
        const { email } = req.body;

        const result = await Users.deleteOne({ email: email });

        if (result.deletedCount === 0) {
            return res.status(405).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {

        res.status(500).json({ message: 'Server error' });
    }
})

app.post('/payment', async (req, res) => {

    const { cardNumber, cardDate, cvv } = req.body;

    if (!cardNumber && !cardDate && !cvv) {
        return res.json({ success: false, errors: "Inserire i dati della carta!" });
    }else if(!cardNumber){
        return res.json({ success: false, errors: "Inserire il numero della carta!" });
    }else if(!cardDate){
        return res.json({ success: false, errors: "Inserire la data di scadenza della carta!" });
    }else if(!cvv){
        return res.json({ success: false, errors: "Inserire il codice di sicurezza!" });
    }

    try {
        return res.json({ success: true, message: "Pagamento effettuato con successo!" });
    } catch (error) {
        return res.json({ success: false, errors: "Errore nell'elaborazione del pagamento." });
    }
    
});

app.listen(port,(error) => {
    if(!error){
        console.log("Server running on port: " + port);
    }else{
        console.log("error: " + error);
    }
});
