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
  },
  img: {
    url: {
      type: String,
    },
    alt: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
  }
});

export default model('Product', productSchema);