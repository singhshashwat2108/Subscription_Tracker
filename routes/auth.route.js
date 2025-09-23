import { Router } from 'express';

import {signin,signout, signup} from'./controllers/auth.controllers.js';


const authrouter= Router();

authrouter.post('/sign-up', signin);

authrouter.post('/sign-in', signout);

authrouter.post('/sign-out', signup);

export default authrouter;