import express from 'express';
import { connectToMongoDB } from './config/mongoose';
import dotenv from 'dotenv';

dotenv.config();
connectToMongoDB();

const port = process.env.PORT || 3001;

const app = express();
app.use(express.json());

app.listen(port, () => {
  console.log(`Server working on port: ${port}`)
})