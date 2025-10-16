import {Router} from 'express';

import {getusers,getuser} from '../controllers/user.controller.js';

const userauth = Router();

userauth.get('/',getusers);

userauth.get('/:id',getuser);

userauth.post('/send',(req,res)=> res.send({message:'send user auth'}));

userauth.put('/put',(req,res)=> res.send({message:'update user auth'}));

userauth.delete('/delete',(req,res)=> res.send({message:'delete the user'}));

export default userauth;
