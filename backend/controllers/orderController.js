import { Order } from '../models/Order.js';

// @desc   Create new order
// @route  POST /api/orders
export const createOrder = async (req, res) => {
  try {
    const { customerName, customerPhone, hostelBlock, roomNo, items, totalAmount, paymentMethod } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items in order' });
    }

    const order = await Order.create({
      customerName,
      customerPhone,
      hostelBlock,
      roomNo,
      items,
      totalAmount,
      paymentMethod
    });

    res.status(201).json({ success: true, message: 'Order placed successfully!', data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Order creation failed', error: error.message });
  }
};

// @desc   Get all orders
// @route  GET /api/orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};
