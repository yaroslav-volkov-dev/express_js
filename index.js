import express from 'express';
import dotenv from 'dotenv';
import { connectToMongoDB } from './config/mongoose.js';
import { registerValidator } from './validations/auth.js';
import { checkAuth } from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';

dotenv.config();
connectToMongoDB();

const port = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.post('/auth/register', registerValidator, UserController.register);
app.post('/auth/login', UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

app.listen(port, () => {
  console.log(`Server working on port: ${port}`);
});