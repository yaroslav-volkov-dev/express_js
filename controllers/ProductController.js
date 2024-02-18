import ProductModel from '../models/ProductModel.js';

export const getAllProducts = async (req, res) => {
  try {
    const data = await ProductModel.find();
    res.json(data);

  } catch (error) {
    res.status(500).json({ message: 'Cannot get products list' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const doc = new ProductModel(req.body);
    const newProduct = await doc.save();
    res.json({ data: newProduct, success: true });

  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { _id } = req.body;
    const product = await ProductModel.findById({ _id });
    if (!product) return res.status(400).json({ message: 'Product with such category doesnt exists' });
    await ProductModel.deleteOne({ _id });
    res.json({ message: 'Product successfully deleted', data: product });

  } catch (error) {
    res.status(500).json({ message: error });
  }
};