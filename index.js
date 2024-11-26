const express = require("express")
const app = express()
app.use(express.json())
// forms
app.use(express.urlencoded({extended: false}))

const mongoose =  require("mongoose") // new
const mongoUrl = require("./db.url")
const Product = require("./models/product.model")
// middleware

const port = 3000


app.get('/', function (req, res) {
    res.send("Hello From NODsaE IOSA")
})

app.get('/api/products', async (req, res)=> {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    }catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/api/products/:id', async (req, res)=> {
    try {
        const { id } = req.params;

        const products = await Product.findById(id)
        res.status(200).json(products)
    }catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
        console.log("Error Occured! Please try again")
    }
})

app.post('/api/products', async (req, res)=> {
   try {
    const product =  await Product.create(req.body)
       res.status(200).json(product)
       console.log("Added Product " + product["name"])

   }catch (error) {
       res.status(500).json({message: error.message})
       console.log("Error Occured! Please try again")
   }
})

app.put('/api/products/:id', async (req, res)=> {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)
        if(!product){
            return res.status(404).json({message: "Product Not Found"})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
    }catch (error) {
        res.status(500).json({message: error.message})
    }
})
// delete a product
app.delete('/api/products/:id', async (req, res)=> {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({message: "Product Not Found"})
        }
        res.status(200).json({message: "Product Deleted Successfully"})
    }catch (error) {
        res.status(500).json({message: error.message})
    }
})


mongoose.connect(mongoUrl).then(()=>
{
    console.log("Database is Connected");
    app.listen(port, function () {
        console.log("Server is running on http://localhost:3000 ...")
    })
});

mongoose.connection.on('error', (err) => {
    console.log("Mongoose connection error: " + err);
});
