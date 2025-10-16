import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken'
import {Jwt_expires,Jwt_secret} from '../config/env.js';


export const signup = async (req ,res , next) =>{
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const{name , email, password} = req.body;

    //check if user exists
    const existinguser = await User.findOne({email});

    if(existinguser){
      const error = new Error("user already exists");
      error.statusCode =409;
      throw error;
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password,salt);

    console.log("Incoming body:", req.body);


    const newuser = await User.create([{ name, email ,password: hashpassword }], {session});

    const token  = jwt.sign( { userId : newuser[0]._id}, Jwt_secret, {expiresIn: Jwt_expires})

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: 'user created',
      data:{
        token,
        user : newuser[0]
      }
    })

  }
  catch(error){
    await session.abortTransaction();
    session.endSession();
    next(error)
  }

}

export const signin = async (req,res,next) =>{
  try {
    const {email, password} = req.body;

    const user =await User.findOne({email});

    if(!user){
      const error =new Error('User not found');
      error.statusCode = 404;
      throw error;

    }

    const ispassword = await bcrypt.compare(password, user.password);
    
    if(!ispassword){                                   //**error handling of incorrect password is not working**
      const error = new Error("invalis password");
      error.statusCode= 401;
      throw error;
    }

    const token = jwt.sign({userId: user.id} , Jwt_secret, {expiresIn: Jwt_expires});

    res.status(200).json({
      success:true,
      message: 'user signed in successfully',
      data:{
        token,
        user,
      }
    });
  } catch (error) {
    next(error);
  }

}

export const deleteuser = async (req,res,next) =>{

  try{
    const {email}= req.body;

    const user= await User.findOne({email});

    if(!user){
      const error = new Error("user not available");
      error.statusCode=404;
      throw error;
    }

    await user.deleteOne();


    res.status(200).json({
      success:true,
      message:"user successfully deleted"
    })
  }
  catch(error){
    next(error);

  };
}