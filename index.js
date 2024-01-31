import express from 'express';
import { connectToMongoDB } from './config/mongoose.js';
import dotenv from 'dotenv';
import { registerValidator } from './validations/auth.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import UserModel from './models/UserModel.js';
import jwt from 'jsonwebtoken';

dotenv.config();
connectToMongoDB();

const port = process.env.PORT || 3001;

const app = express();
app.use(express.json());

app.post('/auth/register', registerValidator, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.array());

    const { email, username, password, avatarUrl } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const doc = new UserModel({ email, username, avatarUrl, passwordHash: hash });
    const user = await doc.save();
    const token = jwt.sign({ _id: user._id }, 'userToken', { expiresIn: '30d' });
    const { passwordHash, ...userdata } = user._doc;

    res.json({ ...userdata, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: 'Can not register' });
  }
});

app.listen(port, () => {
  console.log(`Server working on port: ${port}`);
});