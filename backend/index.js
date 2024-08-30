const port = 4000 || 8080;

const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");
const stripe = require("stripe")("sk_test_51Ps4GXDvu9U1LDKGLEqyHldZzFlfot91Z3G835u6rvQm35BBBPHPC9gZtX8MQPbIbwQwPKk4ZnCy1MPecaLBgAF300HOWny4fN");

const app = express();

app.use(express.json());

app.use(cors());

//DATABASE CONNECTION WITH MONGO DB
mongoose.connect("mongodb+srv://admin3:admin3@e-commerce.zsqb1.mongodb.net/")

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
        return res.status(400).json({success:false,errors:"Inserisci una foto"});
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

app.post("/addproduct",async (req,res) => {

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
        return res.status(400).json({success:false,errors:"Inserisci il brand"});
    }else if(req.body.description === ''){
        return res.status(400).json({success:false,errors:"Inserisci una descrizione del prodotto"});
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

app.post('/removeproduct',async (req,res) => {

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

//CREATING API FOR GETTING ALL PRODUCTS

app.get('/allproducts',async (req,res) => {

    let products = await Product.find({}); //get all products

    console.log("All products fetch");

    //Response to the deletion query
    res.send(products);

})

//ENDPOINT new collection

app.get('/newcollections',async (req,res) => {

    let products = await Product.find({});

    let newcollection = products.slice(1).slice(-8); //Prendo gli utlitmi 8 prodotti aggiunti

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

app.post('/signup',async (req,res) => {

    let check = await Users.findOne({email:req.body.email});

    if(check){
        return res.status(400).json({success:false,errors:"Existing user found with same email address"});
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

app.post('/login',async (req,res) => {

    let user = await Users.findOne({email:req.body.email});

    if(user){
        const passCompare = req.body.password === user.password; //Compare the two passwords

        if(passCompare){ //Se le password sono uguali
            const data = {
                user:{
                    id:user.id
                }
            }

            const token = jwt.sign(data,'secret_ecom');

            res.json({success:true,token,user});
        }else{
            res.json({success:false,errors:"Wrong Passowrd!"});
        }
    }else{
        res.json({success:false,errors:"User not find: wrong email!"});
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
    console.log("Get Cart");

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
  

app.listen(port,(error) => {
    if(!error){
        console.log("Server running on port: " + port);
    }else{
        console.log("error: " + error);
    }
});
