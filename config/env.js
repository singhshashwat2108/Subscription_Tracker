import {config} from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local`});

export const { 
  PORT , 
  DB_URI, 
  NODE_ENV,
  Jwt_secret,
  Jwt_expires} = process.env