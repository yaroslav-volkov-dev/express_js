import mongoose from 'mongoose';

const CategoryModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

export default mongoose.model('Category', CategoryModel);