import express from 'express'
import Product from '../models/productmodel'
import {  isAuth, isAdmin } from '../util';

const router = express.Router();





router.get("/", async(req,res)=>{

    const products=await Product.find({});
    res.send(products);
})







router.get("/:id", async(req,res)=>{

    const product=await Product.findOne({_id: req.params.id});
    if(product){
        res.send(product);
    }else{
        res.status(404).send({message:"Product not found"});
    }
    // res.send(products);
});







router.post("/",isAuth,isAdmin,async(req,res)=>{

    const product =new Product({
        name:req.body.name,
        image:req.body.image,
        price:req.body.price,
        quantity:req.body.quantity,
        Description:req.body.Description,
        MinDescription:req.body.MinDetail,
    });

    const newProduct = await product.save();
    if(newProduct){
      return res.status(201).send({message:'New Product Created',data:newProduct});
    } 
    return res.status(500).send({message:'Error in Creating Product.'} )
})






router.put("/:id",isAuth,isAdmin,async(req,res)=>{

    const productId=req.params.id;
    const product = await Product.findById({_id:productId});
    if(product){
        
            product.name=req.body.name;
            product.image=req.body.image;
            product.price=req.body.price;
            product.quantity=req.body.quantity;
            product.Description=req.body.Description;
            product.MinDescription=req.body.MinDetail;


            const updateProduct = await product.save();
            if(updateProduct){
              return res.status(200).send({message:'Product Updated',data:updateProduct});
            } 
        }
        return res.status(500).send({message:'Error in Updating Product.'} )


   
});






router.delete("/:id",isAuth,isAdmin,async(req,res)=>{

    const deletedProduct= await Product.findById(req.params.id)
    if(deletedProduct){
        await deletedProduct.remove();
        res.send({message:"Product Delete "})
    } else{
    res.send("error in Deletion");
    }
})





export default router;