import {Router} from 'express';

const userauth = Router();

userauth.get('/:id',(req,res)=>res.send({message:'get user authentication'}));

userauth.post('/send',(req,res)=> res.send({message:'send user auth'}));

userauth.put('/put',(req,res)=> res.send({message:'update user auth'}));

userauth.delete('/delete',(req,res)=> res.send({message:'delete the user'}));

export default userauth;
