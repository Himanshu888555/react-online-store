import express from 'express';
import data from './data';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import userRoute from './routes/userRoute'
// import orderRoute from './routes/orderRoute'
// import productRoute from './routes/productRoute'
const PORT = 5000;
dotenv.config();

const app = express();
app.use(bodyParser.json())

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true}).catch(error=>console.log(error.reason));

app.use("/api/users",userRoute);

// app.use('/api/orders', orderRoute); 

// app.use("/api/products",productRoute); 
 //this is not working properly it is showing some errors 


app.get("/api/products/:id",(req,res)=>{
    const productId=req.params.id;
    const product=data.products.find(x=>x._id===productId);
    if(product)
    res.send(product);
    else
    res.status(404).send({msg:"product not found."});
});

app.get("/api/products",(req,res)=>{
    res.send(data.products);
})



app.listen(PORT, ()=>console.log(" yeahhh working at  ",PORT))