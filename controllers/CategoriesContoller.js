import CategoryModel from '../models/CategoryModel.js';
import { validationResult } from 'express-validator';

export const getAllCategories = async (req, res) => {
  try {
    const data = await CategoryModel.find({});
    res.json({ data, success: true });
  } catch (error) {
    res.status(500).json({ message: 'Cannot get all categories' });
  }
};

export const createCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.array());

    const doc = new CategoryModel(req.body);

    const newCategory = await doc.save();
    res.json({ data: newCategory, success: true });

  } catch (error) {
    res.status(500).json({ message: error });
  }
};