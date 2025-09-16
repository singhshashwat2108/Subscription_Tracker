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
    match:[/\s+@\s+\.\s+/,'please fill a valid email'],
  },
  password:{
    type:String,
  }
},{timestamp:true});

const user = mongoose.model('user',userschema);

export default user;