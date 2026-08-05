import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  image: { type: String }
});

const orderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    hostelBlock: { type: String, required: true },
    roomNo: { type: String, required: true },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['COD', 'UPI'], default: 'COD' },
    orderStatus: { type: String, enum: ['Placed', 'Processing', 'Delivered', 'Cancelled'], default: 'Placed' }
  },
  { timestamps: true }
);

export const Order = mongoose.model('Order', orderSchema);
