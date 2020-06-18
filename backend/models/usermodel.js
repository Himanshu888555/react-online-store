import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({

    name:{type:String ,required:true},
    email:{type:String ,required:true,index:true,unique:true,dropDups:true},
    password:{type:String,rquired:true},
    isAdmin:{type:Boolean,required:true,default:false},
});

const userModel = mongoose.model("User",UserSchema);

export default userModel;