import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import user from '../models/user.model';
import jwt from 'jsonwebtoken'
import {Jwt_expires,Jwt_secret} from 'env.js';


export const signup = async (req ,res , next) =>{
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const{name , email, password} = req.body;

    //check if user exists
    const existinguser = await user.findOne({email});

    if(existinguser){
      const error = new Error("user already exists");
      error.statusCode =409;
      throw error;
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password,salt);

    const newuser = await user.create([{ name, email , hashpassword }], {session});

    const token  = jwt.sign( { userId : newuser[0]._id}, Jwt_secret, {expiresin: Jwt_expires})

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

export const signout = async (req,res,next) =>{

}

export const signin = async (req,res,next) =>{

}