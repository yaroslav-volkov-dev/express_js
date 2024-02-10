import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  }
});

export default model('Product', productSchema);