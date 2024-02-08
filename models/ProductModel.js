import mongoose from 'mongoose';

const ProductModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  categoryId: {
    type: String,
    required: true
  }
});

export default mongoose.model('Product', ProductModel);