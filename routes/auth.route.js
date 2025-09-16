import { Router } from 'express';

const authrouter= Router();

authrouter.post('/sign-up',(req,res)=> res.send({message:"sign-up"}));

authrouter.post('/sign-in',(req,res)=> res.send({message:"sign-in"}));

authrouter.post('/sign-out',(req,res)=> res.send({message:"sign-out"}));

export default authrouter;