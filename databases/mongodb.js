import mongoose from 'mongoose';
import {DB_URI , NODE_ENV} from '../config/env.js';

if(!DB_URI){
  throw new Error("please define DB_URI in .env.local");
}

const connecttodatabase = async () => {
  try {
    await mongoose.connect(DB_URI);

    console.log(`connected to mongodb in ${NODE_ENV} mode`);
    
  } catch (error) {
    console.log(error);
    process.exit(1);
  }  
};

export default connecttodatabase;