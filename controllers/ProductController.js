import ProductModel from '../models/ProductModel.js';
import { validationResult } from 'express-validator';

export const getAllProducts = async (req, res) => {
  try {
    const data = await ProductModel.find({});
    res.json({ data, success: true });

  } catch (error) {
    res.status(500).json({ message: 'Cannot get products list' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.array());
    
    const doc = new ProductModel(req.body);
    const newProduct = await doc.save();

    res.json({ data: newProduct, success: true });

  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
};