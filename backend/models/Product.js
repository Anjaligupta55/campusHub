import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, index: true },
    categoryLabel: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    rating: { type: Number, default: 4.5 },
    reviews: { type: Number, default: 0 },
    delivery: { type: String, default: 'Delivery today' },
    image: { type: String, required: true },
    stock: { type: Number, default: 20 },
    isFeatured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Product = mongoose.model('Product', productSchema);
