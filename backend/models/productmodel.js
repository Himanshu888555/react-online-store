import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({

    name:{type:String ,required:true},
    image:{type:String ,required:true},
    price:{type:Number ,default:0, required:true},
    quantity:{type:Number ,default:0 ,required:true},
    Description:{type:String ,required:true},
    MinDescription:{type:String ,required:true},

    
});

const ProductModel = mongoose.model("Product",ProductSchema);

export default ProductModel;