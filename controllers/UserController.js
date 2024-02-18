import bcrypt from 'bcrypt';
import UserModel from '../models/UserModel.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {

    const { email, username, password, avatarUrl } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const doc = new UserModel({ email, username, avatarUrl, passwordHash: hash });
    const user = await doc.save();
    const token = jwt.sign({ _id: user._id }, 'userToken', { expiresIn: '30d' });
    const { passwordHash, ...userdata } = user._doc;

    res.json({ ...userdata, token });
  } catch (error) {
    res.status(500).json({ error, message: 'Can not register' });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash);

    if (!user && !isValidPassword) {
      return res.status(400).json({ message: 'Incorrect email or password' });
    }
    const token = jwt.sign({ _id: user._id }, 'userToken', { expiresIn: '30d' });
    const { passwordHash, ...userdata } = user._doc;
    res.json({ ...userdata, token });
  } catch (error) {
    res.status(500).json({ error, message: 'Can not checkAuth' });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) return res.status(404).json({ message: 'User not exists' });

    const { passwordHash, ...userdata } = user._doc;
    res.json(userdata);
  } catch (err) {
    res.status(500).json({ message: 'No access' });
  }
};