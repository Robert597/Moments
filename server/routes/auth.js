import express from 'express';
import { signIn, signUp } from '../controllers/auth.js';
const authRoute = express.Router();

authRoute.post('/signIn', signIn);
authRoute.post('/signUp', signUp);

export default authRoute;