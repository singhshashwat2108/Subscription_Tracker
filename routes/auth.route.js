import { Router } from 'express';

import {signup,deleteuser, signin} from'../controllers/auth.controller.js';


const authrouter= Router();

authrouter.post('/sign-up', signup);

authrouter.post('/sign-in', signin);

authrouter.delete('/delete', deleteuser);

export default authrouter;