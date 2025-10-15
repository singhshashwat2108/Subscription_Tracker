import mongoose from "mongoose";

const userschema= new mongoose.Schema({
  name:{
    type:String,
    required:[true,'name is required'],
    trim: true,
    minlength:2,
    maxlength:15,
  },
  email:{
    type:String,
    required:[true,'email is required'],
    lowercase:true,
    match:[/^\S+@\S+\.\S+$/,'please fill a valid email'],
  },
  password:{
    type:String,
  }
},{timestamps:true});

const User = mongoose.model('user',userschema);

export default User;