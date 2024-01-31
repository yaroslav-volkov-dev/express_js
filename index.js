import express from 'express';
import { connectToMongoDB } from './config/mongoose.js';
import dotenv from 'dotenv';
import { registerValidator } from './validations/auth.js';
import { validationResult } from "express-validator";

dotenv.config();
connectToMongoDB();

const port = process.env.PORT || 3001;

const app = express();
app.use(express.json());

app.post('/auth/register', registerValidator, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array())
  }
  res.json({
    success: true
  })
})

app.listen(port, () => {
  console.log(`Server working on port: ${port}`)
})