import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product } from '../models/Product.js';

dotenv.config();

const sampleProducts = [
  {
    title: 'Casio FX-991EX ClassWiz Scientific Calculator',
    category: 'electronics',
    categoryLabel: 'Electronics & Accessories',
    price: 1299.00,
    originalPrice: 1599.00,
    rating: 4.9,
    reviews: 340,
    delivery: 'Delivery in 1 hr',
    image: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&q=80&w=400',
    stock: 25
  },
  {
    title: 'Classmate Pulse Premium Notebooks (Pack of 6)',
    category: 'study',
    categoryLabel: 'Study Essentials',
    price: 180.00,
    originalPrice: 240.00,
    rating: 4.8,
    reviews: 185,
    delivery: 'Delivery today',
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=400',
    stock: 50
  },
  {
    title: 'Heavy Duty Metal Mesh Desk Organizer',
    category: 'hostel',
    categoryLabel: 'Hostel Essentials',
    price: 299.00,
    originalPrice: 399.00,
    rating: 4.5,
    reviews: 92,
    delivery: 'Delivery tomorrow',
    image: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&q=80&w=400',
    stock: 15
  },
  {
    title: 'Official CampusHub Insulated Smart Water Bottle',
    category: 'merchandise',
    categoryLabel: 'College Merchandise',
    price: 399.00,
    originalPrice: 499.00,
    rating: 4.7,
    reviews: 65,
    delivery: 'Delivery today',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=400',
    stock: 40
  },
  {
    title: 'Ergonomic Aluminum Foldable Laptop Stand',
    category: 'electronics',
    categoryLabel: 'Electronics & Accessories',
    price: 799.00,
    originalPrice: 999.00,
    rating: 4.6,
    reviews: 110,
    delivery: 'Delivery in 2 hrs',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=400',
    stock: 30
  },
  {
    title: 'Organic Lavender Hostel Aromatherapy Room Diffuser',
    category: 'personal',
    categoryLabel: 'Personal Care',
    price: 499.00,
    originalPrice: 699.00,
    rating: 4.4,
    reviews: 48,
    delivery: 'Delivery tomorrow',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400',
    stock: 12
  },
  {
    title: 'Premium Fleece Varsity Hoodie (Royal Navy Edition)',
    category: 'merchandise',
    categoryLabel: 'College Merchandise',
    price: 1299.00,
    originalPrice: 1799.00,
    rating: 4.8,
    reviews: 215,
    delivery: 'Delivery today',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400',
    stock: 18
  },
  {
    title: 'Hardbound Grid-Line Engineering Project Journal',
    category: 'study',
    categoryLabel: 'Study Essentials',
    price: 120.00,
    originalPrice: 150.00,
    rating: 4.7,
    reviews: 54,
    delivery: 'Delivery in 1 hr',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400',
    stock: 60
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/campushub');
    console.log('🔄 Connecting to MongoDB for seeding...');

    await Product.deleteMany();
    console.log('🗑️ Existing products cleared.');

    await Product.insertMany(sampleProducts);
    console.log('✅ Sample products inserted successfully!');

    process.exit();
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
};

seedDB();
