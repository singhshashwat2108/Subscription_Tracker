import {Router} from 'express';

const subsauth = Router();

subsauth.get('/:id',(req,res)=>res.send({message:'get user subscription'}));

subsauth.post('/sendsubs',(req,res)=> res.send({message:'send subcription'}));

subsauth.put('/putsubs',(req,res)=> res.send({message:'update subscriber'}));

subsauth.delete('/deletesubs',(req,res)=> res.send({message:'delete the subscriber'}));

export default subsauth;
