import {Router} from 'express';
import {authorize} from '../middleware/auth.middleware.js';
import {getusers,getuser} from '../controllers/user.controller.js';

const userauth = Router();

userauth.get('/',getusers);

userauth.get('/:id',authorize,getuser);

userauth.post('/send',(req,res)=> res.send({message:'send user auth'}));

userauth.put('/put',(req,res)=> res.send({message:'update user auth'}));

userauth.delete('/delete',(req,res)=> res.send({message:'delete the user'}));

export default userauth;
