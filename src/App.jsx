import React, { useState, useEffect, useRef } from 'react';

// --- MOCK DATABASE ---
const PRODUCTS = [
  {
    id: 'prod-1',
    title: 'Casio FX-991EX ClassWiz Scientific Calculator',
    category: 'electronics',
    categoryLabel: 'Electronics & Accessories',
    price: 1299.00,
    originalPrice: 1599.00,
    rating: 4.9,
    reviews: 340,
    delivery: 'Delivery in 1 hr',
    image: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-2',
    title: 'Classmate Pulse Premium Notebooks (Pack of 6)',
    category: 'study',
    categoryLabel: 'Study Essentials',
    price: 180.00,
    originalPrice: 240.00,
    rating: 4.8,
    reviews: 185,
    delivery: 'Delivery today',
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-3',
    title: 'Heavy Duty Metal Mesh Desk Organizer',
    category: 'hostel',
    categoryLabel: 'Hostel Essentials',
    price: 299.00,
    originalPrice: 399.00,
    rating: 4.5,
    reviews: 92,
    delivery: 'Delivery tomorrow',
    image: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-4',
    title: 'Official CampusHub Insulated Smart Water Bottle',
    category: 'merchandise',
    categoryLabel: 'College Merchandise',
    price: 399.00,
    originalPrice: 499.00,
    rating: 4.7,
    reviews: 65,
    delivery: 'Delivery today',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-5',
    title: 'Ergonomic Aluminum Foldable Laptop Stand',
    category: 'electronics',
    categoryLabel: 'Electronics & Accessories',
    price: 799.00,
    originalPrice: 999.00,
    rating: 4.6,
    reviews: 110,
    delivery: 'Delivery in 2 hrs',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-6',
    title: 'Organic Lavender Hostel Aromatherapy Room Diffuser',
    category: 'personal',
    categoryLabel: 'Personal Care',
    price: 499.00,
    originalPrice: 699.00,
    rating: 4.4,
    reviews: 48,
    delivery: 'Delivery tomorrow',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-7',
    title: 'Premium Fleece Varsity Hoodie (Royal Navy Edition)',
    category: 'merchandise',
    categoryLabel: 'College Merchandise',
    price: 1299.00,
    originalPrice: 1799.00,
    rating: 4.8,
    reviews: 215,
    delivery: 'Delivery today',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-8',
    title: 'Hardbound Grid-Line Engineering Project Journal',
    category: 'study',
    categoryLabel: 'Study Essentials',
    price: 120.00,
    originalPrice: 150.00,
    rating: 4.7,
    reviews: 54,
    delivery: 'Delivery in 1 hr',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400'
  }
];

const RAW_CATALOG = {
  study: {
    label: '📚 Study Essentials',
    items: [
      { name: 'Notebooks', price: 60, original: 80, img: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&q=80&w=400' },
      { name: 'Registers', price: 80, original: 100, img: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=400' },
      { name: 'Pens', price: 10, original: 15, img: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=400' },
      { name: 'Pencils', price: 5, original: 8, img: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=400' },
      { name: 'Highlighters', price: 40, original: 50, img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=400' },
      { name: 'Markers', price: 25, original: 30, img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=400' },
      { name: 'Sticky Notes', price: 45, original: 60, img: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=400' },
      { name: 'Index Cards', price: 35, original: 50, img: 'https://images.unsplash.com/photo-1605870445919-838d190e8e1b?auto=format&fit=crop&q=80&w=400' },
      { name: 'Files & Folders', price: 75, original: 100, img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400' },
      { name: 'Drawing Sheets', price: 50, original: 70, img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=400' },
      { name: 'Graph Paper', price: 20, original: 30, img: 'https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?auto=format&fit=crop&q=80&w=400' },
      { name: 'Lab Record Books', price: 120, original: 150, img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=400' },
      { name: 'Calculators', price: 399, original: 499, img: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&q=80&w=400' },
      { name: 'Geometry Box', price: 150, original: 180, img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400' },
      { name: 'Scientific Calculator', price: 1299, original: 1599, img: 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&q=80&w=400' },
      { name: 'Whiteboard', price: 349, original: 499, img: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=400' },
      { name: 'Whiteboard Marker', price: 25, original: 35, img: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=400' },
      { name: 'Eraser', price: 5, original: 10, img: 'https://images.unsplash.com/photo-1602722851756-3c224213d256?auto=format&fit=crop&q=80&w=400' },
      { name: 'Sharpener', price: 5, original: 10, img: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1141?auto=format&fit=crop&q=80&w=400' },
      { name: 'Scale', price: 15, original: 20, img: 'https://images.unsplash.com/photo-1607513746994-51f730a44832?auto=format&fit=crop&q=80&w=400' },
      { name: 'Glue Stick', price: 25, original: 35, img: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=400' },
      { name: 'Tape', price: 15, original: 20, img: 'https://images.unsplash.com/photo-1596701358999-70233076ff7a?auto=format&fit=crop&q=80&w=400' }
    ]
  },
  electronics: {
    label: '💻 Electronics & Accessories',
    items: [
      { name: 'Laptop Charger', price: 1200, original: 1500, img: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=400' },
      { name: 'Mobile Charger', price: 499, original: 699, img: 'https://images.unsplash.com/photo-1619176317589-cf284bfdb582?auto=format&fit=crop&q=80&w=400' },
      { name: 'Charging Cable', price: 199, original: 299, img: 'https://images.unsplash.com/photo-1541667590-f769d6c25c95?auto=format&fit=crop&q=80&w=400' },
      { name: 'USB Hub', price: 599, original: 799, img: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=400' },
      { name: 'Pendrive', price: 399, original: 599, img: 'https://images.unsplash.com/photo-1601524909162-be87252be298?auto=format&fit=crop&q=80&w=400' },
      { name: 'SSD', price: 3499, original: 4999, img: 'https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?auto=format&fit=crop&q=80&w=400' },
      { name: 'Mouse', price: 299, original: 499, img: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=400' },
      { name: 'Keyboard', price: 599, original: 999, img: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=400' },
      { name: 'Mouse Pad', price: 150, original: 250, img: 'https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?auto=format&fit=crop&q=80&w=400' },
      { name: 'Laptop Stand', price: 799, original: 999, img: 'https://images.unsplash.com/photo-1625766763788-95dcce9bf5ac?auto=format&fit=crop&q=80&w=400' },
      { name: 'Cooling Pad', price: 899, original: 1199, img: 'https://images.unsplash.com/photo-1591871937573-74dbba515c4c?auto=format&fit=crop&q=80&w=400' },
      { name: 'Earphones', price: 399, original: 599, img: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&q=80&w=400' },
      { name: 'Headphones', price: 1499, original: 1999, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400' },
      { name: 'Webcam', price: 1500, original: 2200, img: 'https://images.unsplash.com/photo-1602758153401-44754320f666?auto=format&fit=crop&q=80&w=400' },
      { name: 'Power Bank', price: 1299, original: 1799, img: 'https://images.unsplash.com/photo-1609592806453-69b1896ec37c?auto=format&fit=crop&q=80&w=400' },
      { name: 'HDMI Cable', price: 250, original: 350, img: 'https://images.unsplash.com/photo-1558244661-d248897f7bc4?auto=format&fit=crop&q=80&w=400' },
      { name: 'Extension Board', price: 399, original: 599, img: 'https://images.unsplash.com/photo-1624996379697-f01d168b1a52?auto=format&fit=crop&q=80&w=400' },
      { name: 'Adapter', price: 299, original: 399, img: 'https://images.unsplash.com/photo-1592832122594-c0c6bad74837?auto=format&fit=crop&q=80&w=400' },
      { name: 'Multi Plug', price: 199, original: 299, img: 'https://images.unsplash.com/photo-1585695029497-6a457497d391?auto=format&fit=crop&q=80&w=400' }
    ]
  },
  hostel: {
    label: '🏠 Hostel Room Essentials',
    items: [
      { name: 'Bucket', price: 150, original: 200, img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400' },
      { name: 'Mug', price: 30, original: 50, img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400' },
      { name: 'Hangers', price: 99, original: 150, img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=400' },
      { name: 'Lock', price: 180, original: 250, img: 'https://images.unsplash.com/photo-1610484826967-09c5720778c7?auto=format&fit=crop&q=80&w=400' },
      { name: 'Laundry Basket', price: 299, original: 399, img: 'https://images.unsplash.com/photo-1595341888016-a392efc50346?auto=format&fit=crop&q=80&w=400' },
      { name: 'Clothes Drying Rope', price: 49, original: 80, img: 'https://images.unsplash.com/photo-1528642474498-1af0c17fd8c3?auto=format&fit=crop&q=80&w=400' },
      { name: 'Bedsheet', price: 399, original: 599, img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=400' },
      { name: 'Pillow Cover', price: 99, original: 150, img: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=400' },
      { name: 'Blanket', price: 899, original: 1299, img: 'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?auto=format&fit=crop&q=80&w=400' },
      { name: 'Mattress Protector', price: 499, original: 799, img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=400' },
      { name: 'Table Lamp', price: 450, original: 600, img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=400' },
      { name: 'Study Lamp', price: 399, original: 550, img: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=400' },
      { name: 'Desk Organizer', price: 249, original: 349, img: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=400' },
      { name: 'Dustbin', price: 80, original: 120, img: 'https://images.unsplash.com/photo-1574966737967-df5072049e6f?auto=format&fit=crop&q=80&w=400' },
      { name: 'Storage Box', price: 199, original: 299, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400' },
      { name: 'Shoe Rack', price: 599, original: 799, img: 'https://images.unsplash.com/photo-1596079890744-c1a0462d0975?auto=format&fit=crop&q=80&w=400' },
      { name: 'Mirror', price: 150, original: 250, img: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=400' }
    ]
  },
  personal: {
    label: '🧴 Personal Care',
    items: [
      { name: 'Toothbrush', price: 30, original: 40, img: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&q=80&w=400' },
      { name: 'Toothpaste', price: 90, original: 110, img: 'https://images.unsplash.com/photo-1559599141-3816a0843111?auto=format&fit=crop&q=80&w=400' },
      { name: 'Shampoo', price: 180, original: 220, img: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=400' },
      { name: 'Conditioner', price: 199, original: 250, img: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=400' },
      { name: 'Soap', price: 40, original: 50, img: 'https://images.unsplash.com/photo-1607006342456-ba275cd3a7b6?auto=format&fit=crop&q=80&w=400' },
      { name: 'Face Wash', price: 150, original: 199, img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400' },
      { name: 'Moisturizer', price: 199, original: 249, img: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=400' },
      { name: 'Comb', price: 20, original: 30, img: 'https://images.unsplash.com/photo-1590156546946-ce55a12a6a5d?auto=format&fit=crop&q=80&w=400' },
      { name: 'Hair Oil', price: 99, original: 120, img: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=400' },
      { name: 'Razor', price: 80, original: 100, img: 'https://images.unsplash.com/photo-1613679021487-22485458f2f6?auto=format&fit=crop&q=80&w=400' },
      { name: 'Shaving Cream', price: 110, original: 140, img: 'https://images.unsplash.com/photo-1626017122180-2a74c10a46f7?auto=format&fit=crop&q=80&w=400' },
      { name: 'Towel', price: 299, original: 399, img: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=400' },
      { name: 'Nail Cutter', price: 50, original: 75, img: 'https://images.unsplash.com/photo-1628149455678-de663e0dc9c4?auto=format&fit=crop&q=80&w=400' },
      { name: 'Deodorant', price: 199, original: 249, img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=400' },
      { name: 'Sanitizer', price: 40, original: 50, img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=400' },
      { name: 'Wet Wipes', price: 60, original: 80, img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400' },
      { name: 'Tissue Paper', price: 50, original: 70, img: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=400' },
      { name: 'Cotton Buds', price: 30, original: 45, img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=400' }
    ]
  },
  clothing: {
    label: '👕 Clothing Essentials',
    items: [
      { name: 'College Hoodie', price: 1299, original: 1699, img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400' },
      { name: 'T-Shirts', price: 299, original: 499, img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=400' },
      { name: 'Socks', price: 99, original: 149, img: 'https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&q=80&w=400' },
      { name: 'Slippers', price: 199, original: 299, img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=400' },
      { name: 'Raincoat', price: 499, original: 699, img: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=400' },
      { name: 'Umbrella', price: 299, original: 399, img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400' },
      { name: 'Laundry Bag', price: 149, original: 199, img: 'https://images.unsplash.com/photo-1616906757947-fdf20dc55806?auto=format&fit=crop&q=80&w=400' }
    ]
  },
  kitchen: {
    label: '🍽 Kitchen & Utility',
    items: [
      { name: 'Electric Kettle', price: 799, original: 1199, img: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=400' },
      { name: 'Coffee Mug', price: 150, original: 200, img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400' },
      { name: 'Water Bottle', price: 199, original: 299, img: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=400' },
      { name: 'Lunch Box', price: 249, original: 349, img: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=400' },
      { name: 'Spoon Set', price: 99, original: 149, img: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=400' },
      { name: 'Plate', price: 80, original: 120, img: 'https://images.unsplash.com/photo-1589589982755-d4122dcc9a3d?auto=format&fit=crop&q=80&w=400' },
      { name: 'Bowl', price: 60, original: 90, img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=400' },
      { name: 'Flask', price: 499, original: 699, img: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=400' },
      { name: 'Storage Containers', price: 199, original: 299, img: 'https://images.unsplash.com/photo-1539683255143-73a6b838b106?auto=format&fit=crop&q=80&w=400' }
    ]
  },
  printing: {
    label: '🖨 Printing & Services',
    items: [
      { name: 'Print Notes', price: 2, original: 4, img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400' },
      { name: 'Colour Printing', price: 10, original: 15, img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400' },
      { name: 'Black & White Printing', price: 2, original: 3, img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400' },
      { name: 'Spiral Binding', price: 49, original: 79, img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400' },
      { name: 'Project Binding', price: 199, original: 299, img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400' },
      { name: 'Lamination', price: 30, original: 50, img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400' },
      { name: 'ID Card Printing', price: 50, original: 80, img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400' },
      { name: 'Photo Printing', price: 15, original: 25, img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400' }
    ]
  },
  merchandise: {
    label: '🎓 College Merchandise',
    items: [
      { name: 'College Hoodie', price: 1299, original: 1799, img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400' },
      { name: 'College T-Shirt', price: 499, original: 699, img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=400' },
      { name: 'ID Card Holder', price: 50, original: 75, img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400' },
      { name: 'Lanyard', price: 40, original: 60, img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400' },
      { name: 'College Diary', price: 199, original: 299, img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400' },
      { name: 'College Cap', price: 299, original: 399, img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=400' },
      { name: 'Stickers', price: 29, original: 49, img: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=400' }
    ]
  },
  marketplace: {
    label: '🔄 Second-Hand Market',
    items: [
      { name: 'Engineering Books', price: 350, original: 800, img: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400', seller: 'Sarah M. (Junior, CS)' },
      { name: 'Novels', price: 150, original: 350, img: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400', seller: 'Pooja V. (Senior, Mech)' },
      { name: 'Calculators', price: 500, original: 1200, img: 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&q=80&w=400', seller: 'Rajesh K. (Senior, EE)' },
      { name: 'Lab Coats', price: 150, original: 300, img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400', seller: 'Daniel T. (Sophomore, Bio)' },
      { name: 'Drawing Boards', price: 200, original: 500, img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=400', seller: 'Aarav S. (Sophomore, EE)' },
      { name: 'Laptop', price: 18000, original: 45000, img: 'https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?auto=format&fit=crop&q=80&w=400', seller: 'Priya N. (Senior, Mech)' },
      { name: 'Monitor', price: 4000, original: 9000, img: 'https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?auto=format&fit=crop&q=80&w=400', seller: 'Sarah M. (Junior, CS)' },
      { name: 'Keyboard', price: 300, original: 800, img: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=400', seller: 'Rajesh K. (Senior, EE)' },
      { name: 'Mouse', price: 150, original: 400, img: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=400', seller: 'Rajesh K. (Senior, EE)' },
      { name: 'Hostel Furniture', price: 800, original: 2000, img: 'https://images.unsplash.com/photo-1564758564527-b97d79cb27c1?auto=format&fit=crop&q=80&w=400', seller: 'Daniel T. (Sophomore, Bio)' },
      { name: 'Cycle', price: 2000, original: 5000, img: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=400', seller: 'Sarah M. (Junior, CS)' }
    ]
  },
  services: {
    label: '🛠 Campus Services',
    items: [
      { name: 'Laptop Cleaning', price: 799, original: 999, img: 'https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?auto=format&fit=crop&q=80&w=400' },
      { name: 'Keyboard Cleaning', price: 199, original: 299, img: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=400' },
      { name: 'Device Setup', price: 499, original: 699, img: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?auto=format&fit=crop&q=80&w=400' },
      { name: 'Hostel Room Cleaning', price: 299, original: 399, img: 'https://images.unsplash.com/photo-1564758564527-b97d79cb27c1?auto=format&fit=crop&q=80&w=400' },
      { name: 'Water Can Booking', price: 50, original: 60, img: 'https://images.unsplash.com/photo-1564758564527-b97d79cb27c1?auto=format&fit=crop&q=80&w=400' },
      { name: 'Courier Pickup', price: 99, original: 149, img: 'https://images.unsplash.com/photo-1564758564527-b97d79cb27c1?auto=format&fit=crop&q=80&w=400' },
      { name: 'Parcel Collection', price: 49, original: 79, img: 'https://images.unsplash.com/photo-1564758564527-b97d79cb27c1?auto=format&fit=crop&q=80&w=400' },
      { name: 'Document Delivery', price: 39, original: 59, img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400' }
    ]
  },
  combos: {
    label: '📦 Student Combo Packs',
    items: [
      { name: 'Freshers Kit', price: 999, original: 1499, img: 'https://images.unsplash.com/photo-1564758564527-b97d79cb27c1?auto=format&fit=crop&q=80&w=400', items: ['Bucket', 'Mug', 'Lock', 'Hangers', 'Bedsheet'] },
      { name: 'Exam Kit', price: 1499, original: 1999, img: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=400', items: ['Notebook', 'Pens', 'Highlighter', 'Sticky Notes', 'Calculator'] },
      { name: 'Placement Kit', price: 1799, original: 2499, img: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=400', items: ['Resume Folder', 'Notebook', 'Pen', 'Laptop Stand', 'Webcam'] },
      { name: 'Lab Kit', price: 599, original: 899, img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400', items: ['Lab Coat', 'Calculator', 'Record File', 'Stationery'] }
    ]
  }
};

const CATALOG_PRODUCTS = [];
Object.entries(RAW_CATALOG).forEach(([catKey, catVal]) => {
  catVal.items.forEach((item, idx) => {
    CATALOG_PRODUCTS.push({
      id: `bp-${catKey}-${idx}`,
      title: item.name,
      category: catKey,
      categoryLabel: catVal.label,
      price: item.price,
      originalPrice: item.original,
      image: item.img,
      desc: item.desc || `Premium quality ${item.name} for college students. Sourced and delivered hyperlocal.`,
      items: item.items || null,
      seller: item.seller || null,
      sellerImg: item.seller ? 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100' : null,
      delivery: catKey === 'services' ? 'Scheduled Booking' : 'Delivery in 15 mins'
    });
  });
});


const SERVICES = [
  {
    id: 'srv-1',
    title: 'Print & Deliver',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
    description: 'Upload files (PDFs, PPTs) and get double-sided prints delivered to your hostel door.',
    price: 2.00,
    unit: 'per page',
    status: 'Active',
    image: '/srv_print.jpg'
  },
  {
    id: 'srv-2',
    title: 'Laptop Deep Clean',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
      </svg>
    ),
    description: 'Internal dust removal, thermal paste application, and external sanitization.',
    price: 799.00,
    unit: 'fixed',
    status: 'Book Slot',
    image: '/srv_laptop.jpg'
  },
  {
    id: 'srv-3',
    title: 'Spiral & Soft Binding',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-16.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-16.25v16.25" />
      </svg>
    ),
    description: 'Transform loose pages, records, or theses into neat professional soft-bound booklets.',
    price: 49.00,
    unit: 'per book',
    status: 'Active',
    image: '/srv_binding.jpg'
  },
  {
    id: 'srv-4',
    title: 'Room Essentials Kit Setup',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
    description: 'Full unboxing and setup service of beds, study table attachments, and organizers.',
    price: 499.00,
    unit: 'service',
    status: 'Book Slot',
    image: '/srv_setup.jpg'
  },
  {
    id: 'srv-5',
    title: 'Water Can Booking',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.893 13.393c-.097.35-.376.629-.726.726l-3.327.917c-.35.096-.729-.098-.826-.448l-.917-3.327c-.096-.35.098-.729.448-.826l3.327-.917c.35-.096.729.098.826.448l.917 3.327ZM2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Z" />
      </svg>
    ),
    description: '20L purified drinking water bubble top delivered directly inside your hostel room.',
    price: 50.00,
    unit: 'can',
    status: 'Active',
    image: '/srv_water.jpg'
  }
];

const COMBOS = [
  {
    id: 'combo-1',
    title: 'Semester Exam Prep Kit',
    tag: 'Popular',
    desc: 'Top grade scoring essentials to beat the final exam pressure.',
    items: ['2x Premium Gel Pens', 'Casio FX-991EX Calculator', 'Grid notebook', 'Sticky Notes pack', '1x Energy Drink Can'],
    price: 1499.00,
    originalPrice: 1999.00,
    image: '/combo_exam_kit.png'
  },
  {
    id: 'combo-2',
    title: 'Campus Freshers Kit',
    tag: 'Must Have',
    desc: 'The complete starter pack to gear up with campus style & utility.',
    items: ['Official Varsity Hoodie', 'Insulated Smart Water Bottle', 'Campus Lanyard & Badge Holder', 'Campus Hub Sticker Pack'],
    price: 1799.00,
    originalPrice: 2499.00,
    image: '/combo_freshers_kit.png'
  },
  {
    id: 'combo-3',
    title: 'Hostel Starter Kit',
    tag: 'Hostel Favorite',
    desc: 'No-fuss basic accessories to turn a bare room into your cozy den.',
    items: ['Comfort Cotton Bedsheet', 'Sleek Bedside Clamp Lamp', 'Desk Stationery Cup Holder', '10x Laundry Clothes Hangers'],
    price: 999.00,
    originalPrice: 1499.00,
    image: '/combo_hostel_kit.png'
  },
  {
    id: 'combo-4',
    title: 'Placement Crack Kit',
    tag: 'Trending',
    desc: 'Dress and prepare to impress the hiring recruiters.',
    items: ['Executive PU Leather File Folder', 'Premium Rollerball Pen', '10x Printed Resumes (Premium Paper)', 'Interview prep guide booklet'],
    price: 599.00,
    originalPrice: 899.00,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400'
  }
];

const MARKETPLACE = [
  {
    id: 'market-1',
    title: 'Thomas Calculus Textbook (14th Edition)',
    condition: 'good',
    conditionLabel: 'Good Condition',
    desc: 'Mild pencil highlights on first 3 chapters. No torn pages. Used for Semester 1.',
    price: 350.00,
    tag: 'Books',
    seller: 'Rajesh K. (Senior, EE)',
    sellerImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'market-2',
    title: 'Texas Instruments TI-84 Plus CE',
    condition: 'excellent',
    conditionLabel: 'Like New',
    desc: 'Includes charger and original box cover. Screen has zero scratches. Used only for SAT exams.',
    price: 4500.00,
    tag: 'Electronics',
    seller: 'Sarah M. (Junior, CS)',
    sellerImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
    image: 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'market-3',
    title: 'Campus Lab Coat (Size L)',
    condition: 'excellent',
    conditionLabel: 'Excellent',
    desc: 'Freshly washed. No chemical stains. Emblazoned with chemistry department logo.',
    price: 250.00,
    tag: 'Apparel',
    seller: 'Daniel T. (Sophomore, Bio)',
    sellerImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'market-4',
    title: 'USB Clip-on Study Desk Fan',
    condition: 'fair',
    conditionLabel: 'Fairly Used',
    desc: 'Fully functional, rotates at 3 speeds. Plugs into laptop or powerbank. Ideal for summer hostel heat.',
    price: 150.00,
    tag: 'Hostel',
    seller: 'Pooja V. (Senior, Mech)',
    sellerImg: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
    image: 'https://images.unsplash.com/photo-1591871937573-74dbba515c4c?auto=format&fit=crop&q=80&w=400'
  }
];

export default function App() {
  // --- STATE MANAGEMENT ---
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem('campushub_cart')) || [];
  });
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem('campushub_wishlist')) || [];
  });
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [toasts, setToasts] = useState([]);
  
  // Modals Open State
  const [loginOpen, setLoginOpen] = useState(false);
  const [sellerOpen, setSellerOpen] = useState(false);
  const [trackOpen, setTrackOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Authentication & Signup
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupBlock, setSignupBlock] = useState('H-4');
  const [signupRoom, setSignupRoom] = useState('');

  // Checkout & Payment
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'upi' | 'wallet' | 'cod'
  const [paymentCardNo, setPaymentCardNo] = useState('');
  const [paymentCardExpiry, setPaymentCardExpiry] = useState('');
  const [paymentCardCvv, setPaymentCardCvv] = useState('');
  const [paymentCardName, setPaymentCardName] = useState('');
  const [paymentUpiId, setPaymentUpiId] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Dynamic Orders history
  const [orders, setOrders] = useState([
    { id: 'CH-83920', date: '2026-07-29', total: 430, location: 'Hostel Block H-4, Room 302', status: 'shipping', items: 'Trimax Pens, Classmate Notebooks', runner: 'Sarah M. (Junior)' },
    { id: 'CH-83815', date: '2026-07-15', total: 1299, location: 'Hostel Block H-4, Room 302', status: 'completed', items: 'Official Varsity Hoodie', runner: 'Sarah M. (Junior)' },
    { id: 'CH-83601', date: '2026-06-12', total: 180, location: 'Central Library Desk 12', status: 'completed', items: 'Notebooks (Pack of 6)', runner: 'Daniel T. (Sophomore)' }
  ]);

  const [currentTab, setCurrentTab] = useState('home'); // 'home' | 'blinkit_store' | 'admin_dashboard'
  const [activeCategory, setActiveCategory] = useState('study');
  const [blinkitSearchQuery, setBlinkitSearchQuery] = useState('');
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    { sender: 'ai', text: 'Hi! I am your CampusHub AI Assistant. Ask me for "Exam Kit", "Hostel Essentials", "Under ₹500", or "Laptop Accessories" for smart recommendations!' }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [adminActiveTab, setAdminActiveTab] = useState('revenue');

  // Printing Hub States
  const [printFile, setPrintFile] = useState(null);
  const [printPages, setPrintPages] = useState(10);
  const [printColor, setPrintColor] = useState('bw');
  const [printBinding, setPrintBinding] = useState('spiral');
  const [printLamination, setPrintLamination] = useState(false);

  // Marketplace Listings State
  const [marketplaceItems, setMarketplaceItems] = useState([
    { id: 'm-1', title: 'Thomas Calculus (14th Edition)', category: 'marketplace', price: 350, originalPrice: 850, image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400', desc: 'Slightly used engineering textbook, ideal for first year calculations.', seller: 'Sarah M. (CS, Junior)', condition: 'Good' },
    { id: 'm-2', title: 'Casio Scientific Calculator FX-991EX', category: 'marketplace', price: 500, originalPrice: 1200, image: 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&q=80&w=400', desc: 'Engineers standard scientific calculator. Fully working, batteries included.', seller: 'Rajesh K. (EE, Senior)', condition: 'Excellent' },
    { id: 'm-3', title: 'White Chemistry Lab Coat', category: 'marketplace', price: 150, originalPrice: 300, image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400', desc: 'Size M, slightly stained near pockets, washed and sanitized.', seller: 'Daniel T. (Bio, Sophomore)', condition: 'Fair' },
    { id: 'm-4', title: 'Hostel Desk Table Organizer', category: 'marketplace', price: 180, originalPrice: 400, image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=400', desc: 'Wooden modular desk storage box for pencils, books, and phone stand.', seller: 'Pooja V. (Mech, Senior)', condition: 'Excellent' }
  ]);

  // Services Booking States
  const [bookingService, setBookingService] = useState('Laptop Cleaning');
  const [bookingDate, setBookingDate] = useState('2026-07-30');
  const [bookingTime, setBookingTime] = useState('10:00 AM - 12:00 PM');
  const [bookingLoc, setBookingLoc] = useState('Hostel Block H-4');

  // Student Profile preferences
  const [studentBlock, setStudentBlock] = useState('H-4');
  const [studentRoom, setStudentRoom] = useState('302');
  const [studentDept, setStudentDept] = useState('Computer Science');
  const [studentSem, setStudentSem] = useState('Semester 5');
  const [walletBalance, setWalletBalance] = useState(450);
  const [profileAddresses, setProfileAddresses] = useState([
    'Hostel Block H-4, Room 302',
    'Central Library, Cubicle 12'
  ]);
  const [newProfileAddress, setNewProfileAddress] = useState('');

  const handlePrintFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPrintFile(file.name);
      addToast(`File selected: ${file.name}`);
    }
  };

  useEffect(() => {
    const container = document.querySelector('.product-detail-container');
    if (container) {
      container.scrollTop = 0;
    }
  }, [selectedProduct]);

  // Modal input fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const [sellerName, setSellerName] = useState('');
  const [sellerDept, setSellerDept] = useState('');
  const [sellerItem, setSellerItem] = useState('');
  const [sellerPrice, setSellerPrice] = useState('');
  const [sellerCondition, setSellerCondition] = useState('excellent');
  const [sellerDesc, setSellerDesc] = useState('');

  const [trackInput, setTrackInput] = useState('');
  const [trackStatusResult, setTrackStatusResult] = useState(null);

  const [newsletterEmail, setNewsletterEmail] = useState('');

  const originalSlides = ['/hero_slide_1.jpg', '/hero_slide_2.jpg', '/hero_slide_3.jpg', '/hero_slide_4.jpg'];
  const HERO_SLIDES = [originalSlides[originalSlides.length - 1], ...originalSlides, originalSlides[0]];
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentSlide(prev => prev + 1);
    }, 2500); // rotates every 2.5 seconds
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleTransitionEnd = () => {
    if (currentSlide >= HERO_SLIDES.length - 1) {
      setIsTransitioning(false);
      setCurrentSlide(1);
    } else if (currentSlide <= 0) {
      setIsTransitioning(false);
      setCurrentSlide(HERO_SLIDES.length - 2);
    }
  };

  const searchInputRef = useRef(null);
  const suggestionsBoxRef = useRef(null);

  // Sync states to LocalStorage
  useEffect(() => {
    localStorage.setItem('campushub_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('campushub_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Click outside search suggestion box to close
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        searchInputRef.current && 
        !searchInputRef.current.contains(e.target) &&
        suggestionsBoxRef.current && 
        !suggestionsBoxRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- ACTIONS & TOASTS ---
  const addToast = (message, isError = false) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, isError }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handleAddToCart = (item, type = 'product') => {
    if (!currentUser) {
      addToast('Please login first to add items to your cart!', true);
      setAuthMode('login');
      setLoginOpen(true);
      return;
    }
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      } else {
        return [...prev, {
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=100',
          quantity: 1
        }];
      }
    });
    addToast(`Added "${item.title}" to cart`);
  };

  const handleUpdateQty = (itemId, change) => {
    setCart(prev => {
      const item = prev.find(i => i.id === itemId);
      if (!item) return prev;
      const newQty = item.quantity + change;
      if (newQty <= 0) {
        return prev.filter(i => i.id !== itemId);
      }
      return prev.map(i => i.id === itemId ? { ...i, quantity: newQty } : i);
    });
  };

  const handleRemoveFromCart = (itemId) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
    addToast('Item removed from cart');
  };

  const handleToggleWishlist = (itemId, itemTitle) => {
    if (!currentUser) {
      addToast('Please login first to add items to your wishlist!', true);
      setAuthMode('login');
      setLoginOpen(true);
      return;
    }
    setWishlist(prev => {
      const exists = prev.includes(itemId);
      if (exists) {
        addToast(`Removed "${itemTitle}" from Wishlist`);
        return prev.filter(id => id !== itemId);
      } else {
        addToast(`Added "${itemTitle}" to Wishlist`);
        return [...prev, itemId];
      }
    });
  };

  // --- SEARCH ENGINE ---
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const trimmed = query.toLowerCase().trim();
    if (trimmed.length < 2) {
      setSearchSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const matches = PRODUCTS.filter(p => p.title.toLowerCase().includes(trimmed))
      .concat(SERVICES.filter(s => s.title.toLowerCase().includes(trimmed)))
      .slice(0, 5);

    setSearchSuggestions(matches);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (item) => {
    setSearchQuery(item.title);
    setShowSuggestions(false);
    
    // Switch to Dorm Store tab and populate query
    setCurrentTab('dorm_store');
    setBlinkitSearchQuery(item.title);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- MODAL SUBMISSIONS ---
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      addToast('Please fill in all fields', true);
      return;
    }
    setCurrentUser({
      name: 'Rajesh Kumar',
      email: loginEmail,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=40'
    });
    addToast('Logged in successfully! Welcome back, Rajesh.');
    setLoginOpen(false);
    setLoginEmail('');
    setLoginPassword('');
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!signupName || !signupEmail || !signupPassword || !signupRoom) {
      addToast('Please fill in all fields', true);
      return;
    }
    // Update profile states
    setStudentBlock(signupBlock);
    setStudentRoom(signupRoom);
    setCurrentUser({
      name: signupName,
      email: signupEmail,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=40'
    });
    addToast(`Account created successfully! Welcome to CampusHub, ${signupName}.`);
    setLoginOpen(false);
    // Reset fields
    setSignupName('');
    setSignupEmail('');
    setSignupPassword('');
    setSignupBlock('H-4');
    setSignupRoom('');
  };

  const handleSellerSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      addToast('Please login first to list items!', true);
      setAuthMode('login');
      setLoginOpen(true);
      return;
    }
    if (!sellerName || !sellerDept || !sellerItem || !sellerPrice || !sellerDesc) {
      addToast('Please fill in all fields', true);
      return;
    }
    addToast(`Listing request submitted! Verification for "${sellerItem}" will take up to 2 hrs.`);
    setSellerOpen(false);
    setSellerName('');
    setSellerDept('');
    setSellerItem('');
    setSellerPrice('');
    setSellerDesc('');
  };

  const handleTrackLookup = () => {
    const code = trackInput.toUpperCase().trim();
    if (!code) {
      addToast('Please enter an Order ID', true);
      return;
    }
    
    // Check if it's a dynamic order ID from our orders state
    const dynamicOrder = orders.find(o => o.id === code || o.id === `CH-${code}`);
    if (dynamicOrder) {
      setTrackStatusResult({
        orderId: dynamicOrder.id,
        estTime: dynamicOrder.status === 'completed' ? 'Delivered' : '15 Mins',
        steps: [
          { title: 'Order Confirmed', desc: 'Your payment was confirmed and order was received.', time: 'Today', status: 'completed' },
          { title: 'Runner Dispatched', desc: `Delivery partner ${dynamicOrder.runner} assigned.`, time: 'Today', status: dynamicOrder.status === 'pending' ? 'active' : 'completed' },
          { title: 'Out for Delivery', desc: `Rider heading to ${dynamicOrder.location}.`, time: 'Today', status: dynamicOrder.status === 'shipping' ? 'active' : dynamicOrder.status === 'completed' ? 'completed' : 'pending' },
          { title: 'Delivered', desc: 'Order delivered to room floor.', time: dynamicOrder.status === 'completed' ? 'Today' : 'Pending', status: dynamicOrder.status === 'completed' ? 'completed' : 'pending' }
        ]
      });
      return;
    }

    if (code === 'CH-12345' || code === '12345') {
      setTrackStatusResult({
        orderId: 'CH-12345',
        estTime: '12 Mins',
        steps: [
          { title: 'Order Confirmed', desc: 'Hostel Starter Kit confirmed by CampusHub storage', time: 'Today, 2:10 PM', status: 'completed' },
          { title: 'Courier Assigned', desc: 'Sarah (Sophomore, CS) picked up your items', time: 'Today, 2:18 PM', status: 'completed' },
          { title: 'Out for Delivery', desc: 'Rider is passing by Library, heading to Hostel H-4 (Room 302)', time: 'Today, 2:24 PM', status: 'active' },
          { title: 'Arrived at Hostel', desc: 'Requires buyer security OTP clearance code', time: 'Pending', status: 'pending' }
        ]
      });
    } else {
      setTrackStatusResult({ error: true });
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      addToast(`Subscribed! Check coupons sent to ${newsletterEmail}`);
      setNewsletterEmail('');
    }
  };

  const handleContactSeller = (seller, product) => {
    if (!currentUser) {
      addToast('Please login first to contact a seller!', true);
      setAuthMode('login');
      setLoginOpen(true);
      return;
    }
    addToast(`Chat request dispatched to ${seller} regarding "${product}"`);
  };

  const handleBookService = (title) => {
    if (!currentUser) {
      addToast('Please login first to book a service!', true);
      setAuthMode('login');
      setLoginOpen(true);
      return;
    }
    addToast(`Booking initiated for "${title}". Checkout scheduler slots!`);
    
    const newOrderId = `SRV-${Math.floor(10000 + Math.random() * 90000)}`;
    const grandTotal = title.includes('Laptop') ? 799 : 
                       title.includes('Keyboard') ? 199 : 
                       title.includes('OS') ? 499 : 
                       title.includes('Deep Cleaning') ? 299 :
                       title.includes('Water Can') ? 50 : 99;

    // Add to orders history
    const newOrder = {
      id: newOrderId,
      date: new Date().toISOString().split('T')[0],
      total: grandTotal,
      location: `Hostel Block ${studentBlock}, Room ${studentRoom}`,
      status: 'pending',
      items: `Service Booking: ${title}`,
      runner: 'Technician Assigned'
    };

    setOrders(prev => [newOrder, ...prev]);

    setTrackOpen(true);
    setTrackStatusResult({
      orderId: newOrderId,
      estTime: 'Today at 4:00 PM',
      steps: [
        { title: 'Booking Confirmed', desc: `Service request for "${title}" accepted`, time: 'Just now', status: 'completed' },
        { title: 'Technician Dispatched', desc: 'Campus technician scheduled to head to your block', time: 'Pending', status: 'active' }
      ]
    });
  };

  // Subtotal Calculation
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryCharge = cart.length > 0 ? 39 : 0;
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const getRelatedProducts = () => {
    if (!selectedProduct) return [];
    if (selectedProduct.id.startsWith('market-')) {
      return MARKETPLACE.filter(item => item.id !== selectedProduct.id && item.tag === selectedProduct.tag)
        .concat(MARKETPLACE.filter(item => item.id !== selectedProduct.id && item.tag !== selectedProduct.tag))
        .slice(0, 4);
    } else if (selectedProduct.id.startsWith('combo-')) {
      return COMBOS.filter(item => item.id !== selectedProduct.id).slice(0, 4);
    } else {
      return PRODUCTS.filter(item => item.id !== selectedProduct.id && item.category === selectedProduct.category)
        .concat(PRODUCTS.filter(item => item.id !== selectedProduct.id && item.category !== selectedProduct.category))
        .slice(0, 4);
    }
  };
  const relatedProducts = getRelatedProducts();

  return (
    <>
      {/* ==========================================
           STICKY NAVIGATION BAR
           ========================================== */}
      <header className="navbar-wrapper">
        <div className="container navbar">
          {/* Brand Logo */}
          <a href="#" className="nav-brand" onClick={(e) => { e.preventDefault(); setCurrentTab('home'); window.scrollTo(0,0); }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Campus<span>Hub</span>
          </a>

          {/* Categories Hover Trigger */}
          <div className="category-dropdown">
            <button className="dropdown-trigger">
              <span>Categories</span>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
              </svg>
            </button>
            <div className="dropdown-menu">
              <a href="#featured-products" className="dropdown-item" onClick={() => setCategoryFilter('study')}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ marginRight: '8px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-16.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-16.25v16.25" />
                </svg>
                Study Essentials
              </a>
              <a href="#featured-products" className="dropdown-item" onClick={() => setCategoryFilter('electronics')}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ marginRight: '8px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                </svg>
                Electronics & Accessories
              </a>
              <a href="#featured-products" className="dropdown-item" onClick={() => setCategoryFilter('hostel')}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ marginRight: '8px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                Hostel Essentials
              </a>
              <a href="#featured-products" className="dropdown-item" onClick={() => setCategoryFilter('personal')}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ marginRight: '8px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                Personal Care
              </a>
              <a href="#services" className="dropdown-item">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ marginRight: '8px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.567-1.12-1.227L6.34 18m11.318 0h-11.32" />
                </svg>
                Printing & Binding
              </a>
              <a href="#featured-products" className="dropdown-item" onClick={() => setCategoryFilter('merchandise')}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ marginRight: '8px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122A3 3 0 0 0 12 17.75a3 3 0 0 0 2.47-1.628M9.53 16.122a3 3 0 0 1-2.47-1.628m4.94 0a3 3 0 0 0-2.47-1.628m4.94 0A3 3 0 0 0 12 11.25M9.53 16.122v4.878m4.94-4.878v4.878M12 11.25V3" />
                </svg>
                College Merchandise
              </a>
              <a href="#marketplace" className="dropdown-item">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ marginRight: '8px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
                Second-Hand Marketplace
              </a>
            </div>
          </div>

          {/* Search autocomplete field */}
          <div className="nav-search">
            <div className="search-box">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z"></path>
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setShowSuggestions(false);
                    setCurrentTab('dorm_store');
                    setBlinkitSearchQuery(searchQuery);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                onFocus={() => { if (searchQuery.trim().length >= 2) setShowSuggestions(true); }}
                placeholder="Search textbooks, calculators, cleanings..."
                autoComplete="off"
              />
            </div>
            
            {showSuggestions && (
              <div className="search-suggestions active" ref={suggestionsBoxRef}>
                {searchSuggestions.length === 0 ? (
                  <>
                    <div className="suggestion-section-title">No matches found</div>
                    <div className="suggestion-item">Try searching for 'calculator' or 'laptop cleaning'</div>
                  </>
                ) : (
                  <>
                    <div className="suggestion-section-title">Suggested Matches</div>
                    <ul className="suggestion-list">
                      {searchSuggestions.map(item => (
                        <li 
                          key={item.id}
                          className="suggestion-item" 
                          onClick={() => handleSuggestionClick(item)}
                        >
                          <span style={{ marginRight: '6px' }}>
                            {item.price && item.unit ? '📄' : '📦'}
                          </span>
                          <strong>{item.title}</strong>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="nav-links">
            <button className={`nav-link-btn ${currentTab === 'dorm_store' ? 'active' : ''}`} onClick={() => { setCurrentTab('dorm_store'); setBlinkitSearchQuery(''); }}>Store</button>
            <button className={`nav-link-btn ${currentTab === 'printing' ? 'active' : ''}`} onClick={() => setCurrentTab('printing')}>Print</button>
            <button className={`nav-link-btn ${currentTab === 'marketplace' ? 'active' : ''}`} onClick={() => setCurrentTab('marketplace')}>Market</button>
            <button className={`nav-link-btn ${currentTab === 'services' ? 'active' : ''}`} onClick={() => setCurrentTab('services')}>Services</button>
            <button className={`nav-link-btn ${currentTab === 'combos' ? 'active' : ''}`} onClick={() => setCurrentTab('combos')}>Combos</button>
            <button className={`nav-link-btn ${currentTab === 'profile' ? 'active' : ''}`} onClick={() => setCurrentTab('profile')}>Profile</button>
            <button className={`nav-link-btn ${currentTab === 'admin' ? 'active' : ''}`} onClick={() => { setCurrentTab('admin'); setAdminActiveTab('revenue'); }}>Admin</button>
          </nav>

          {/* Action Counters */}
          <div className="nav-actions">
            {/* Wishlist */}
            <button className="icon-btn" onClick={() => setWishlistOpen(true)} aria-label="Wishlist items count">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"></path>
              </svg>
              {wishlist.length > 0 && <span className="icon-badge">{wishlist.length}</span>}
            </button>

            {/* Cart Trigger */}
            <button className="icon-btn" onClick={() => setCartOpen(true)} aria-label="Cart bag items count">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0z"></path>
              </svg>
              {totalCartCount > 0 && <span className="icon-badge">{totalCartCount}</span>}
            </button>

            {/* User State */}
            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <img 
                  src={currentUser.avatar} 
                  alt="avatar" 
                  style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid var(--border-color)' }}
                />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{currentUser.name}</span>
              </div>
            ) : (
              <button className="btn btn-secondary" style={{ padding: '0.5rem 1.25rem' }} onClick={() => setLoginOpen(true)}>
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ==========================================
           MAIN CONTENT SECTIONS
           ========================================== */}
      <main>
        {currentTab === 'home' && (
          <>
            {/* HERO SECTION */}
            <section className="hero-section" id="hero">
          <div className="container hero-grid">
            <div className="hero-content">
              <div className="hero-tagline">
                <span className="badge badge-primary">Hyperlocal Campus Delivery</span>
              </div>
              <h1 className="hero-title">Everything You Need On Campus. <span>Delivered Fast.</span></h1>
              <p className="hero-desc">
                CampusHub brings stationery, electronics, hostel kits, and student services straight to your dorm room floor in minutes. Sourced from verified sellers right on campus.
              </p>
              <div className="hero-ctas">
                <a href="#featured-products" className="btn btn-primary" onClick={() => setCategoryFilter('all')}>Shop Products</a>
                <a href="#services" class="btn btn-secondary">Explore Services</a>
              </div>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">15 Mins</span>
                  <span class="stat-label">Average Delivery</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">4.9★</span>
                  <span class="stat-label">Student Rating</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">2,500+</span>
                  <span class="stat-label">Campus Orders</span>
                </div>
              </div>
            </div>
          <div className="hero-image-wrapper" style={{ position: 'relative', width: '100%', aspectRatio: '1.4', overflow: 'hidden', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border-color)' }}>
            <div 
              onTransitionEnd={handleTransitionEnd}
              style={{
                display: 'flex',
                width: `${HERO_SLIDES.length * 100}%`,
                height: '100%',
                transform: `translateX(-${(currentSlide * 100) / HERO_SLIDES.length}%)`,
                transition: isTransitioning ? 'transform 0.8s ease-in-out' : 'none'
              }}
            >
              {HERO_SLIDES.map((slide, idx) => (
                <img
                  key={idx}
                  src={slide}
                  alt={`Campus Hub Student Life Slide ${idx + 1}`}
                  style={{
                    width: `${100 / HERO_SLIDES.length}%`,
                    height: '100%',
                    objectFit: 'cover',
                    flexShrink: 0
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

        {/* QUICK CATEGORY CARDS */}
        <section className="section section-alt" id="categories">
          <div className="container">
            <div className="section-header">
              <span className="badge badge-accent">Quick Browse</span>
              <h2>Shop by Category</h2>
              <p>Find items and gear tailored specifically to student academic and hostel life.</p>
            </div>
            <div className="category-cards-grid">
              {/* Study Essentials */}
              <a href="#featured-products" className="category-card" onClick={() => setCategoryFilter('study')} style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '140px', overflow: 'hidden', backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                  <img src="/cat_study.png" alt="Study Essentials" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="category-img-hover" />
                </div>
                <div style={{ padding: '1.5rem', width: '100%' }}>
                  <h3>Study Essentials</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', minHeight: '40px' }}>Notebooks, record sheets, drawing journals, lab equipment, pens.</p>
                  <span className="category-card-link">Explore Store</span>
                </div>
              </a>

              {/* Electronics & Accessories */}
              <a href="#featured-products" className="category-card" onClick={() => setCategoryFilter('electronics')} style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '140px', overflow: 'hidden', backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                  <img src="/cat_electronics.png" alt="Electronics" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="category-img-hover" />
                </div>
                <div style={{ padding: '1.5rem', width: '100%' }}>
                  <h3>Electronics & Accessories</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', minHeight: '40px' }}>Scientific calculators, charging cables, adapters, ethernet cords.</p>
                  <span className="category-card-link">Explore Store</span>
                </div>
              </a>

              {/* Hostel Essentials */}
              <a href="#featured-products" className="category-card" onClick={() => setCategoryFilter('hostel')} style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '140px', overflow: 'hidden', backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                  <img src="/cat_hostel.png" alt="Hostel Essentials" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="category-img-hover" />
                </div>
                <div style={{ padding: '1.5rem', width: '100%' }}>
                  <h3>Hostel Essentials</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', minHeight: '40px' }}>Bedsheets, room organizers, table lamps, clip fans, laundry pegs.</p>
                  <span className="category-card-link">Explore Store</span>
                </div>
              </a>

              {/* Personal Care */}
              <a href="#featured-products" className="category-card" onClick={() => setCategoryFilter('personal')} style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '140px', overflow: 'hidden', backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                  <img src="/cat_personal.png" alt="Personal Care" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="category-img-hover" />
                </div>
                <div style={{ padding: '1.5rem', width: '100%' }}>
                  <h3>Personal Care</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', minHeight: '40px' }}>Hygiene kits, grooming tools, late-night snacks, health drinks.</p>
                  <span className="category-card-link">Explore Store</span>
                </div>
              </a>

              {/* Printing & Binding */}
              <a href="#services" className="category-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '140px', overflow: 'hidden', backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                  <img src="/cat_printing.png" alt="Printing & Binding" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="category-img-hover" />
                </div>
                <div style={{ padding: '1.5rem', width: '100%' }}>
                  <h3>Printing & Binding</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', minHeight: '40px' }}>PDF/PPT cloud printing, spiral binding, thesis binding services.</p>
                  <span className="category-card-link">Explore Service</span>
                </div>
              </a>

              {/* College Merchandise */}
              <a href="#featured-products" className="category-card" onClick={() => setCategoryFilter('merchandise')} style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '140px', overflow: 'hidden', backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                  <img src="/cat_merchandise.png" alt="College Merchandise" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="category-img-hover" />
                </div>
                <div style={{ padding: '1.5rem', width: '100%' }}>
                  <h3>College Merchandise</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', minHeight: '40px' }}>Official college hoodies, smart bottles, keychains, stickers, caps.</p>
                  <span className="category-card-link">Explore Store</span>
                </div>
              </a>

              {/* Student Services */}
              <a href="#services" className="category-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '140px', overflow: 'hidden', backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                  <img src="/cat_services.png" alt="Student Services" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="category-img-hover" />
                </div>
                <div style={{ padding: '1.5rem', width: '100%' }}>
                  <h3>Student Services</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', minHeight: '40px' }}>Laptop cleaning, gadget hardware repair, bicycle maintenance.</p>
                  <span className="category-card-link">Explore Service</span>
                </div>
              </a>

              {/* Second-Hand Market */}
              <a href="#marketplace" className="category-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '140px', overflow: 'hidden', backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                  <img src="/cat_marketplace.png" alt="Second-Hand Market" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="category-img-hover" />
                </div>
                <div style={{ padding: '1.5rem', width: '100%' }}>
                  <h3>Second-Hand Market</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', minHeight: '40px' }}>Buy used reference books, calculators, and gadgets from seniors.</p>
                  <span className="category-card-link">Explore Listings</span>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* POPULAR SERVICES SECTION */}
        <section className="section" id="services">
          <div className="container">
            <div class="section-header">
              <span className="badge badge-primary">Hyperlocal Services</span>
              <h2>Popular Student Services</h2>
              <p>Book quick services operated by skilled campus student vendors, delivered at standard pricing.</p>
            </div>
            <div className="services-container">
              {SERVICES.map(srv => (
                <div key={srv.id} className="service-card" style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{ width: '100%', height: '140px', overflow: 'hidden', backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', position: 'relative' }}>
                    <img src={srv.image} alt={srv.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="category-img-hover" />
                    <span className="service-status" style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 3 }}>{srv.status}</span>
                  </div>
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{srv.title}</h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', minHeight: '40px' }}>{srv.description}</p>
                    </div>
                    <div className="service-footer" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: 'auto' }}>
                      <div className="service-price">
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Est. Price</span>
                        <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>₹{srv.price.toFixed(0)} {srv.unit ? '/' + srv.unit : ''}</strong>
                      </div>
                      <button className="btn-service-book" onClick={() => handleBookService(srv.title)}>Book</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED PRODUCTS GRID */}
        <section className="section section-alt" id="featured-products">
          <div className="container">
            <div className="section-header">
              <span className="badge badge-accent">Daily Picks</span>
              <h2>Featured Campus Products</h2>
              <p>Curated list of premium and high-demand student gear available in campus storage.</p>
            </div>

            {/* Filter Tabs */}
            <div className="product-filters">
              <button className={`filter-btn ${categoryFilter === 'all' ? 'active' : ''}`} onClick={() => setCategoryFilter('all')}>All Items</button>
              <button className={`filter-btn ${categoryFilter === 'study' ? 'active' : ''}`} onClick={() => setCategoryFilter('study')}>Study Essentials</button>
              <button className={`filter-btn ${categoryFilter === 'electronics' ? 'active' : ''}`} onClick={() => setCategoryFilter('electronics')}>Electronics</button>
              <button className={`filter-btn ${categoryFilter === 'hostel' ? 'active' : ''}`} onClick={() => setCategoryFilter('hostel')}>Hostel Essentials</button>
              <button className={`filter-btn ${categoryFilter === 'merchandise' ? 'active' : ''}`} onClick={() => setCategoryFilter('merchandise')}>Official Merch</button>
            </div>

            {/* Product Grid */}
            <div className="product-grid">
              {PRODUCTS.filter(p => categoryFilter === 'all' || p.category === categoryFilter).map(prod => {
                const isInWish = wishlist.includes(prod.id);
                return (
                  <div key={prod.id} className="product-card" data-id={prod.id}>
                    <div className="product-image-container">
                      <img src={prod.image} alt={prod.title} onClick={() => setSelectedProduct(prod)} style={{ cursor: 'pointer' }} />
                      <button 
                        className={`wishlist-toggle ${isInWish ? 'active' : ''}`} 
                        onClick={() => handleToggleWishlist(prod.id, prod.title)}
                        aria-label="Toggle wishlist"
                      >
                        <svg width="18" height="18" fill={isInWish ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                      </button>
                    </div>
                    <div className="product-info">
                      <span className="product-cat">{prod.categoryLabel}</span>
                      <h3 className="product-title" onClick={() => setSelectedProduct(prod)} style={{ cursor: 'pointer' }}>{prod.title}</h3>
                      <div className="product-meta">
                        <div className="product-rating">
                          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                          </svg>
                          <span>{prod.rating}</span>
                        </div>
                        <span className="product-reviews">({prod.reviews})</span>
                        <span className="product-delivery">{prod.delivery}</span>
                      </div>
                      <div className="product-footer">
                        <div className="product-price">
                          ₹{prod.price.toFixed(0)}
                          <span className="original">₹{prod.originalPrice.toFixed(0)}</span>
                        </div>
                        <button className="btn-add-cart" onClick={() => handleAddToCart(prod)}>
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ marginRight: '4px' }}>
                            <path d="M12 5v14M5 12h14"></path>
                          </svg>
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* STUDENT COMBO PACKS */}
        <section className="section" id="combos">
          <div className="container">
            <div className="section-header">
              <span className="badge badge-primary">Super Savers</span>
              <h2>Student Bundle Combo Packs</h2>
              <p>Carefully curated kit bundles containing everything you need for specific campus phases. Saves time and money.</p>
            </div>
            <div className="combo-grid">
              {COMBOS.map(combo => (
                <div key={combo.id} className="combo-card">
                  <div className="combo-image-box">
                    <img src={combo.image} alt={combo.title} onClick={() => setSelectedProduct(combo)} style={{ cursor: 'pointer' }} />
                    <span className="combo-tag">{combo.tag}</span>
                  </div>
                  <div className="combo-body">
                    <h3 onClick={() => setSelectedProduct(combo)} style={{ cursor: 'pointer' }}>{combo.title}</h3>
                    <p>{combo.desc}</p>
                    <ul className="combo-items-list">
                      {combo.items.map((item, idx) => (
                        <li key={idx} className="combo-item">
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" style={{ marginRight: '6px', color: 'var(--success)' }}>
                            <path d="M20 6L9 17l-5-5"></path>
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="combo-footer">
                      <div className="combo-price-block">
                        <span className="discount">Save {(100 - (combo.price / combo.originalPrice * 100)).toFixed(0)}%</span>
                        <div className="price">₹{combo.price.toFixed(0)} <span>₹{combo.originalPrice.toFixed(0)}</span></div>
                      </div>
                      <button className="btn btn-primary btn-combo-add" onClick={() => handleAddToCart(combo, 'combo')}>Add Bundle</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CAMPUSHUB? */}
        <section className="section section-alt" id="why-hub">
          <div className="container">
            <div className="section-header">
              <span className="badge badge-accent">Designed For Students</span>
              <h2>Why Choose CampusHub?</h2>
              <p>We solve the friction of college commerce by building a platform tailored exclusively for student lifestyles.</p>
            </div>
            <div className="why-grid">
              {/* Delivery */}
              <div className="why-card">
                <div className="why-icon-box">
                  <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <h3>Fast Campus Delivery</h3>
                <p>Deliveries are executed by on-campus student runners in under 15 minutes direct to your dorm.</p>
              </div>

              {/* Pricing */}
              <div className="why-card">
                <div className="why-icon-box">
                  <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <h3>Student Pricing</h3>
                <p>Specially subsidized price lists and deals negotiate max savings for college budgets.</p>
              </div>

              {/* Verified Sellers */}
              <div className="why-card">
                <div className="why-icon-box">
                  <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                  </svg>
                </div>
                <h3>Verified Sellers</h3>
                <p>All buyers and sellers authenticate using university email credentials to maintain peer trust.</p>
              </div>

              {/* Secure Payments */}
              <div className="why-card">
                <div className="why-icon-box">
                  <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0V10.5m-2.25 0h13.5c.621 0 1.125.504 1.125 1.125v7.425a1.125 1.125 0 0 1-1.125 1.125H5.25a1.125 1.125 0 0 1-1.125-1.125V11.625c0-.621.504-1.125 1.125-1.125Z" />
                  </svg>
                </div>
                <h3>Secure Payments</h3>
                <p>Supports UPI, digital campus student cards, credit/debit cards, and split wallets.</p>
              </div>

              {/* Returns */}
              <div className="why-card">
                <div className="why-icon-box">
                  <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </div>
                <h3>Easy 24-Hr Returns</h3>
                <p>Change your mind? We offer hassle-free collection from your dorm room within 24 hours.</p>
              </div>
            </div>
          </div>
        </section>

        {/* STUDENT MARKETPLACE SECTION */}
        <section className="section" id="marketplace">
          <div className="container">
            <div className="marketplace-header">
              <div className="marketplace-header-text">
                <span className="badge badge-primary">Peer-to-Peer</span>
                <h2>Seniors to Juniors Marketplace</h2>
                <p>Buy directly from seniors graduation batches or clear out your own room. Direct campus exchange, cash or UPI.</p>
              </div>
              <button className="btn btn-primary" onClick={() => setSellerOpen(true)}>List Your Item</button>
            </div>
            <div className="marketplace-grid">
              {MARKETPLACE.map(item => (
                <div key={item.id} className="marketplace-card">
                  <div className="market-image-container">
                    <img src={item.image} alt={item.title} onClick={() => setSelectedProduct(item)} style={{ cursor: 'pointer' }} />
                    <span className="market-tag">{item.tag}</span>
                    <div className="market-seller-badge">
                      <img src={item.sellerImg} alt={item.seller} />
                      <span>{item.seller}</span>
                    </div>
                  </div>
                  <div className="market-info">
                    <h3 className="market-title" onClick={() => setSelectedProduct(item)} style={{ cursor: 'pointer' }}>{item.title}</h3>
                    <span className={`market-condition cond-${item.condition}`}>{item.conditionLabel}</span>
                    <p className="market-desc">{item.desc}</p>
                    <div className="market-footer">
                      <span className="market-price">₹{item.price.toFixed(0)}</span>
                      <button 
                        className="btn btn-secondary btn-contact-seller" 
                        onClick={() => handleContactSeller(item.seller, item.title)}
                      >
                        Contact Seller
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="section section-alt" id="testimonials">
          <div className="container">
            <div className="section-header">
              <span className="badge badge-accent">Word on Campus</span>
              <h2>What Your Peers Are Saying</h2>
              <p>Hear from students who use CampusHub to ease their academic semester workloads and dormitory life.</p>
            </div>
            <div className="testimonials-grid">
              {/* Testimonial 1 */}
              <div className="testimonial-card">
                <div className="quote-icon">“</div>
                <div className="testimonial-rating">★★★★★</div>
                <p className="testimonial-text">
                  "CampusHub is a lifesaver! I ordered a printed PDF and soft spiral binding for my engineering report at 1:30 AM, and it was delivered to my H4 door by 7:30 AM before my class. Amazing speed!"
                </p>
                <div className="student-profile">
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100" alt="Aarav Sharma profile" className="profile-avatar" />
                  <div className="profile-info">
                    <h4>Aarav Sharma</h4>
                    <p>Sophomore, Electrical Engineering</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="testimonial-card">
                <div className="quote-icon">“</div>
                <div className="testimonial-rating">★★★★★</div>
                <p className="testimonial-text">
                  "Selling my semester textbook and lab notebook to a fresher took less than an hour on the Marketplace section. Much better than spamming WhatsApp student groups with images."
                </p>
                <div className="student-profile">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="Priya Nair profile" className="profile-avatar" />
                  <div className="profile-info">
                    <h4>Priya Nair</h4>
                    <p>Senior, Mechanical Engineering</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="testimonial-card">
                <div className="quote-icon">“</div>
                <div className="testimonial-rating">★★★★★</div>
                <p className="testimonial-text">
                  "The Hostel Starter Kit saved me so much hassle when setting up my dorm room on day one. Having the bedsheet, hangers, lamp, and organizer arrive packaged together was perfect."
                </p>
                <div className="student-profile">
                  <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100" alt="David K. profile" className="profile-avatar" />
                  <div className="profile-info">
                    <h4>David K.</h4>
                    <p>Freshman, Computer Science</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MOBILE APP PROMOTION */}
        <section className="section app-promo-section" id="mobile-download">
          <div className="container">
            <div className="app-banner">
              <div className="app-content">
                <h2>CampusHub App in Your Pocket</h2>
                <p>Scan the code or select your store to download. Get instant room delivery notifications, track your student runner live, and enjoy one-tap checkout with Campus Wallet.</p>
                <div className="app-stores">
                  <a href="#" className="store-badge" onClick={(e) => { e.preventDefault(); addToast('iOS App Download Triggered'); }}>
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.1 16.67C20.08 16.74 19.67 18.11 18.71 19.5M15.97 4.17C16.63 3.37 17.07 2.28 16.95 1C15.99 1.04 14.83 1.64 14.14 2.45C13.53 3.17 13 4.28 13.15 5.5C14.22 5.58 15.3 4.98 15.97 4.17Z"/>
                    </svg>
                    <div className="store-text">
                      <span>Download on the</span>
                      <strong>App Store</strong>
                    </div>
                  </a>
                  <a href="#" className="store-badge" onClick={(e) => { e.preventDefault(); addToast('Android App Download Triggered'); }}>
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M5,3l12.8,7.6c0.6,0.4,0.6,1.2,0,1.6L5,19.8C4.3,20.2,3.5,19.7,3.5,19V4C3.5,3.3,4.3,2.8,5,3z M18.4,12L5.8,4.5v13.9L18.4,12z"/>
                    </svg>
                    <div className="store-text">
                      <span>Get it on</span>
                      <strong>Google Play</strong>
                    </div>
                  </a>
                </div>
              </div>
              <div className="app-visuals">
                <div className="app-qr-card">
                  <img src="/app_qr_code.png" alt="Scan QR Code to Download CampusHub App" />
                  <p>Scan to Download</p>
                  <span>Supports iOS & Android</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
      )}

      {currentTab === 'dorm_store' && (
        <div className="blinkit-store-container">
          {/* Header Bar */}
          <div className="blinkit-store-header-bar">
            <div className="blinkit-search-wrapper">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z"></path>
              </svg>
              <input 
                type="text" 
                value={blinkitSearchQuery}
                onChange={(e) => setBlinkitSearchQuery(e.target.value)}
                placeholder="Search notebooks, SSDs, mattress protectors, face wash..."
              />
              {blinkitSearchQuery && (
                <button className="clear-search-btn" onClick={() => setBlinkitSearchQuery('')}>×</button>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span className="blinkit-delivery-time">⏱ Deliver to Block {studentBlock} Room {studentRoom}</span>
            </div>
          </div>

          {/* Smart Search Tag suggestions */}
          <div className="smart-search-tags">
            <span className="smart-search-label">Try searching:</span>
            <button className="search-tag-btn" onClick={() => setBlinkitSearchQuery('Exam Kit')}>"Exam Kit"</button>
            <button className="search-tag-btn" onClick={() => setBlinkitSearchQuery('Hostel Essentials')}>"Hostel Essentials"</button>
            <button className="search-tag-btn" onClick={() => setBlinkitSearchQuery('Under 500')}>"Under ₹500"</button>
            <button className="search-tag-btn" onClick={() => setBlinkitSearchQuery('Laptop Accessories')}>"Laptop Accessories"</button>
          </div>

          {/* Promo Banner */}
          <div className="blinkit-promo-banner">
            <div className="promo-text">
              <span className="badge badge-accent">Semester Opening Discount</span>
              <h3>Flat 10% Off on Dorm Setup Kits</h3>
              <p>UPI payments accepted. Delivery directly to your dorm room floor in 15 mins!</p>
            </div>
            <div className="promo-bg-badge">10% OFF</div>
          </div>

          {/* Main Split Layout */}
          <div className="blinkit-store-layout">
            {/* Left Sidebar */}
            <div className="blinkit-sidebar">
              {Object.entries(RAW_CATALOG)
                .filter(([key]) => ['study', 'electronics', 'hostel', 'personal', 'clothing', 'kitchen'].includes(key))
                .map(([key, value]) => (
                  <button 
                    key={key}
                    className={`blinkit-sidebar-item ${activeCategory === key ? 'active' : ''}`}
                    onClick={() => { setActiveCategory(key); setBlinkitSearchQuery(''); }}
                  >
                    <span className="sidebar-emoji">{value.label.split(' ')[0]}</span>
                    <span className="sidebar-text">{value.label.split(' ').slice(1).join(' ')}</span>
                  </button>
              ))}
            </div>

            {/* Right Product Grid */}
            <div className="blinkit-catalog-panel">
              <h2 className="catalog-category-title">
                {RAW_CATALOG[activeCategory]?.label || 'Store Essentials'} 
                {blinkitSearchQuery && <span className="search-results-label"> / Search results for "{blinkitSearchQuery}"</span>}
              </h2>
              
              <div className="blinkit-catalog-grid">
                {(() => {
                  let items = CATALOG_PRODUCTS.filter(p => p.category === activeCategory);
                  
                  if (blinkitSearchQuery) {
                    const query = blinkitSearchQuery.toLowerCase().trim();
                    
                    if (query === 'under 500' || query === 'under ₹500') {
                      items = CATALOG_PRODUCTS.filter(p => p.price < 500);
                    } else if (query === 'laptop accessories') {
                      items = CATALOG_PRODUCTS.filter(p => p.category === 'electronics' && (p.title.toLowerCase().includes('laptop') || p.title.toLowerCase().includes('mouse') || p.title.toLowerCase().includes('keyboard') || p.title.toLowerCase().includes('stand') || p.title.toLowerCase().includes('pad')));
                    } else if (query === 'hostel essentials') {
                      items = CATALOG_PRODUCTS.filter(p => p.category === 'hostel');
                    } else if (query === 'exam kit') {
                      items = CATALOG_PRODUCTS.filter(p => p.title.toLowerCase().includes('exam') || p.category === 'study');
                    } else {
                      items = CATALOG_PRODUCTS.filter(p => p.title.toLowerCase().includes(query) || p.categoryLabel.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query));
                    }
                  }

                  if (items.length === 0) {
                    return (
                      <div className="empty-catalog-state">
                        <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.602 10.602z" />
                        </svg>
                        <p>No products found matching your filter</p>
                        <span>Try searching for something else or browse categories</span>
                      </div>
                    );
                  }

                  return items.map(prod => {
                    const cartItem = cart.find(i => i.id === prod.id);
                    const qty = cartItem ? cartItem.quantity : 0;
                    return (
                      <div key={prod.id} className="blinkit-product-card" onClick={() => setSelectedProduct(prod)}>
                        <div className="blinkit-product-img-box">
                          <img src={prod.image} alt={prod.title} />
                          {prod.originalPrice && prod.price < prod.originalPrice && (
                            <span className="blinkit-disc-badge">
                              {((1 - prod.price / prod.originalPrice) * 100).toFixed(0)}% OFF
                            </span>
                          )}
                        </div>
                        <div className="blinkit-product-details">
                          <span className="blinkit-delivery-time">⏱ {prod.delivery}</span>
                          <h4 className="blinkit-product-title">{prod.title}</h4>
                          <p className="blinkit-product-desc-short">{prod.desc}</p>
                          <div className="blinkit-product-footer">
                            <div className="blinkit-price-block">
                              <span className="price">₹{prod.price}</span>
                              {prod.originalPrice && <span className="original">₹{prod.originalPrice}</span>}
                            </div>
                            <div className="blinkit-add-action-box" onClick={(e) => e.stopPropagation()}>
                              {qty === 0 ? (
                                <button className="btn-blinkit-add-sm" onClick={() => handleAddToCart(prod, 'product')}>
                                  ADD
                                </button>
                              ) : (
                                <div className="blinkit-qty-controls-sm">
                                  <button onClick={() => handleUpdateQty(prod.id, -1)}>−</button>
                                  <span>{qty}</span>
                                  <button onClick={() => handleUpdateQty(prod.id, 1)}>+</button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. PRINTING HUB */}
      {currentTab === 'printing' && (
        <div className="printing-hub-container container">
          <div className="printing-header">
            <span className="badge badge-primary">🖨 Academic Printing</span>
            <h2>Cloud Printing & Academic Services</h2>
            <p>Upload your assignments, records, or slides and have them spiral bound and delivered directly to your desk.</p>
          </div>

          <div className="printing-grid">
            {/* Upload & Configure panel */}
            <div className="printing-config-card">
              <h3>Configure Print Job</h3>
              
              <div className="print-form-group">
                <label>Upload Document (PDF, DOCX)</label>
                <input 
                  type="file" 
                  id="print-file-input" 
                  style={{ display: 'none' }} 
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" 
                  onChange={handlePrintFileChange} 
                />
                <div className="print-file-upload-box" onClick={() => document.getElementById('print-file-input').click()}>
                  <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                  </svg>
                  {printFile ? (
                    <span className="upload-success-text">✓ {printFile} uploaded</span>
                  ) : (
                    <span>Click to upload file from device</span>
                  )}
                </div>
              </div>

              <div className="print-form-group">
                <label>Page Count</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <input 
                    type="range" 
                    min="1" 
                    max="150" 
                    value={printPages} 
                    onChange={(e) => setPrintPages(parseInt(e.target.value))} 
                    style={{ flex: 1, accentColor: 'var(--primary)' }}
                  />
                  <input 
                    type="number" 
                    value={printPages}
                    onChange={(e) => setPrintPages(parseInt(e.target.value) || 1)}
                    className="print-page-num-input"
                  />
                </div>
              </div>

              <div className="print-form-group">
                <label>Color Options</label>
                <div className="print-radio-group">
                  <label className={`print-radio-card ${printColor === 'bw' ? 'active' : ''}`}>
                    <input type="radio" name="printColor" checked={printColor === 'bw'} onChange={() => setPrintColor('bw')} style={{ display: 'none' }} />
                    <span>Black & White</span>
                    <span className="price-tag">₹2.00 / page</span>
                  </label>
                  <label className={`print-radio-card ${printColor === 'color' ? 'active' : ''}`}>
                    <input type="radio" name="printColor" checked={printColor === 'color'} onChange={() => setPrintColor('color')} style={{ display: 'none' }} />
                    <span>Colour Print</span>
                    <span className="price-tag">₹10.00 / page</span>
                  </label>
                </div>
              </div>

              <div className="print-form-group">
                <label>Binding Style</label>
                <div className="print-radio-group">
                  <label className={`print-radio-card ${printBinding === 'none' ? 'active' : ''}`}>
                    <input type="radio" name="printBinding" checked={printBinding === 'none'} onChange={() => setPrintBinding('none')} style={{ display: 'none' }} />
                    <span>No Binding</span>
                    <span className="price-tag">₹0</span>
                  </label>
                  <label className={`print-radio-card ${printBinding === 'spiral' ? 'active' : ''}`}>
                    <input type="radio" name="printBinding" checked={printBinding === 'spiral'} onChange={() => setPrintBinding('spiral')} style={{ display: 'none' }} />
                    <span>Spiral Binding</span>
                    <span className="price-tag">+₹49</span>
                  </label>
                  <label className={`print-radio-card ${printBinding === 'project' ? 'active' : ''}`}>
                    <input type="radio" name="printBinding" checked={printBinding === 'project'} onChange={() => setPrintBinding('project')} style={{ display: 'none' }} />
                    <span>Project Binding</span>
                    <span className="price-tag">+₹199</span>
                  </label>
                </div>
              </div>

              <div className="print-form-group" style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input 
                  type="checkbox" 
                  id="lamination" 
                  checked={printLamination} 
                  onChange={(e) => setPrintLamination(e.target.checked)} 
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                />
                <label htmlFor="lamination" style={{ margin: 0, fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer' }}>
                  Add Transparent Sheet Lamination (+₹30)
                </label>
              </div>
            </div>

            {/* Print Summary Invoice panel */}
            <div className="printing-invoice-card">
              <h3>Order Cost Summary</h3>
              <div className="print-invoice-breakdown">
                <div className="invoice-row">
                  <span>{printPages} pages ({printColor === 'bw' ? 'B&W' : 'Color'})</span>
                  <strong>₹{printPages * (printColor === 'bw' ? 2 : 10)}</strong>
                </div>
                <div className="invoice-row">
                  <span>Binding Type ({printBinding})</span>
                  <strong>₹{printBinding === 'spiral' ? 49 : printBinding === 'project' ? 199 : 0}</strong>
                </div>
                <div className="invoice-row">
                  <span>Lamination sheet</span>
                  <strong>₹{printLamination ? 30 : 0}</strong>
                </div>
                <div className="invoice-row">
                  <span>Hyperlocal Student Runner fee</span>
                  <strong>₹15</strong>
                </div>
                <div className="invoice-row total-row">
                  <span>Grand Total</span>
                  <strong>₹{(printPages * (printColor === 'bw' ? 2 : 10)) + (printBinding === 'spiral' ? 49 : printBinding === 'project' ? 199 : 0) + (printLamination ? 30 : 0) + 15}</strong>
                </div>
              </div>

              <div className="print-delivery-block">
                <h4>Select Pickup/Delivery Point</h4>
                <div className="print-delivery-grid">
                  <button className="del-btn-option active">📍 Hostel Room ({studentBlock}-{studentRoom})</button>
                  <button className="del-btn-option" onClick={() => addToast('Selected Classroom Delivery option')}>🏫 Classroom Block</button>
                  <button className="del-btn-option" onClick={() => addToast('Selected Library Desk pickup option')}>📚 Central Library Desk</button>
                  <button className="del-btn-option" onClick={() => addToast('Selected Gate Pickup option')}>🚧 Campus Gate</button>
                </div>
              </div>

              <button 
                className="btn btn-primary print-submit-btn"
                onClick={() => {
                  if (!printFile) {
                    addToast('Please upload a document PDF first', true);
                    return;
                  }
                  addToast(`Order submitted! Your files will print and deliver to Block ${studentBlock} room ${studentRoom} in 25 mins.`);
                  setPrintFile(null);
                }}
              >
                Send Document to Print
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. CAMPUS MARKETPLACE */}
      {currentTab === 'marketplace' && (
        <div className="marketplace-container container">
          <div className="marketplace-banner-split">
            <div className="marketplace-hero">
              <span className="badge badge-accent">🔄 Peer-to-Peer Second-Hand Market</span>
              <h2>Second-Hand Peer Marketplace</h2>
              <p>Buy reference tools, geometry sets, novels, cycles, or hostel furniture directly from graduating seniors.</p>
              <button 
                className="btn btn-primary" 
                style={{ marginTop: '1rem' }} 
                onClick={() => {
                  setSellerItem('');
                  setSellerPrice('');
                  setSellerDesc('');
                  setSellerOpen(true);
                }}
              >
                + List Your Item For Sale
              </button>
            </div>
            
            {/* Quick Listing Stats */}
            <div className="marketplace-stats-promo">
              <div className="promo-stat-box">
                <strong>45+</strong>
                <span>Items Listed Today</span>
              </div>
              <div className="promo-stat-box">
                <strong>98%</strong>
                <span>Verified Peer Trust</span>
              </div>
            </div>
          </div>

          {/* Active Listings Grid */}
          <div className="marketplace-listings-section">
            <h3>Active Campus Listings</h3>
            
            <div className="marketplace-listings-grid">
              {marketplaceItems.map(item => (
                <div key={item.id} className="market-item-card">
                  <div className="market-item-img-container">
                    <img src={item.image} alt={item.title} />
                    <span className={`condition-tag ${item.condition?.toLowerCase() || 'good'}`}>{item.condition}</span>
                  </div>
                  <div className="market-item-body">
                    <span className="market-item-seller">👤 Seller: {item.seller}</span>
                    <h4 className="market-item-title">{item.title}</h4>
                    <p className="market-item-desc">{item.desc}</p>
                    <div className="market-item-footer">
                      <div className="market-price">
                        <strong>₹{item.price}</strong>
                        {item.originalPrice && <span className="orig">₹{item.originalPrice}</span>}
                      </div>
                      <button 
                        className="btn btn-secondary contact-seller-btn"
                        onClick={() => addToast(`Contacting seller ${item.seller.split(' ')[0]} via UPI-chat. Check your notifications.`)}
                      >
                        Contact Seller
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. SERVICES HUB */}
      {currentTab === 'services' && (
        <div className="services-hub-container container">
          <div className="services-header">
            <span className="badge badge-primary">🛠 On-Campus Support</span>
            <h2>Book Campus Dorm Services</h2>
            <p>Schedule skilled campus technicians or helpers to fix, clean, or fetch items for your room.</p>
          </div>

          <div className="services-split-booking">
            {/* Grid of bookable services */}
            <div className="services-list-panel">
              {[
                { title: 'Laptop Cleaning & Fan Thermal Paste', price: 799, icon: '💻', desc: 'Internal dust cleaning, motherboard air blowout, and high-performance thermal paste application.' },
                { title: 'Mechanical Keyboard Deep Clean', price: 199, icon: '⌨️', desc: 'Keycaps removal, ultrasonic cleaning, keyboard switch brush, and re-assembly.' },
                { title: 'Dorm Device Setup & OS Install', price: 499, icon: '💿', desc: 'Operating system clean installation, campus Wi-Fi credentials integration, and software setup.' },
                { title: 'Hostel Room Deep Cleaning', price: 299, icon: '🧹', desc: 'Floor vacuuming, table dust wipe down, fan blade cleaner, shelf organization.' },
                { title: 'Water Can Delivery (20L)', price: 50, icon: '💧', desc: 'Refilled cold drinking mineral water can delivered directly inside your room.' },
                { title: 'Outbound Courier Parcel Pickup', price: 99, icon: '📦', desc: 'Campus runner picks up your boxes and submits them to DTDC courier office for dispatch.' },
                { title: 'Inbound Parcel Office Collection', price: 49, icon: '📯', desc: 'Runner collects post/parcel from college central gate office and delivers to your room.' },
                { title: 'Document & Exam Sheet Room Delivery', price: 39, icon: '📄', desc: 'Inter-hostel delivery of exam notes, sheets, lab coats or calculators.' }
              ].map((srv, idx) => (
                <div 
                  key={idx} 
                  className={`service-selector-card ${bookingService === srv.title ? 'active' : ''}`}
                  onClick={() => setBookingService(srv.title)}
                >
                  <span className="service-icon">{srv.icon}</span>
                  <div className="service-details-text">
                    <h4>{srv.title}</h4>
                    <p>{srv.desc}</p>
                    <strong>₹{srv.price}</strong>
                  </div>
                </div>
              ))}
            </div>

            {/* Date Time slot scheduler */}
            <div className="services-scheduler-card">
              <h3>Confirm Scheduling</h3>
              <div className="scheduler-box">
                <div className="schedule-row">
                  <span>Selected Service:</span>
                  <strong>{bookingService}</strong>
                </div>

                <div className="schedule-input-group">
                  <label>Select Date</label>
                  <input 
                    type="date" 
                    value={bookingDate} 
                    onChange={(e) => setBookingDate(e.target.value)} 
                    className="schedule-date-picker"
                  />
                </div>

                <div className="schedule-input-group">
                  <label>Select Time Slot</label>
                  <div className="time-slots-grid">
                    {[
                      '08:00 AM - 10:00 AM',
                      '10:00 AM - 12:00 PM',
                      '12:00 PM - 02:00 PM',
                      '02:00 PM - 04:00 PM',
                      '04:00 PM - 06:00 PM'
                    ].map(slot => (
                      <button 
                        key={slot} 
                        className={`slot-option-btn ${bookingTime === slot ? 'active' : ''}`}
                        onClick={() => setBookingTime(slot)}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="schedule-input-group">
                  <label>Delivery Point / Dorm Floor</label>
                  <input 
                    type="text" 
                    value={bookingLoc}
                    onChange={(e) => setBookingLoc(e.target.value)}
                    className="schedule-loc-input"
                    placeholder="e.g. Hostel Block H-4 Room 302"
                  />
                </div>

                <div className="scheduler-footer-total">
                  <span>Estimated Total</span>
                  <strong>₹{
                    bookingService.includes('Laptop') ? 799 : 
                    bookingService.includes('Keyboard') ? 199 : 
                    bookingService.includes('OS') ? 499 : 
                    bookingService.includes('Deep Cleaning') ? 299 :
                    bookingService.includes('Water Can') ? 50 : 
                    bookingService.includes('Courier') ? 99 : 
                    bookingService.includes('Parcel') ? 49 : 39
                  }</strong>
                </div>

                <button 
                  className="btn btn-primary schedule-confirm-btn"
                  onClick={() => {
                    addToast(`Booking confirmed for ${bookingService} on ${bookingDate} (${bookingTime})! Check order details in your profile.`);
                  }}
                >
                  Book Service Slot
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. COMBOS & OFFERS */}
      {currentTab === 'combos' && (
        <div className="combos-container container">
          <div className="combos-header">
            <span className="badge badge-accent">🎁 Student Packs & Offers</span>
            <h2>Curated Semester Kits & Rewards</h2>
            <p>Save up to 30% by buying pre-packaged bundles designed for freshers, exams, lab prep, and job placements.</p>
          </div>

          {/* Combos Grid */}
          <div className="combos-grid-view">
            {[
              { title: 'Freshers Starter Kit', price: 999, original: 1499, img: 'https://images.unsplash.com/photo-1564758564527-b97d79cb27c1?auto=format&fit=crop&q=80&w=400', items: ['Utility Plastic Bucket', 'Plastic Mug', 'Hostel Door Lock', 'Premium Clothes Hangers (5)', 'Cotton Single Bedsheet'] },
              { title: 'Semester Exam Prep Kit', price: 1499, original: 1999, img: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=400', items: ['Classmate Register', 'Trimax Gel Pens (Pack of 3)', 'Maped Geometry Box', 'Casio FX-991EX Calculator'] },
              { title: 'Placement Interview Kit', price: 1799, original: 2499, img: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=400', items: ['Executive Leatherette Resume Folder', 'Notebook', 'Signature Ink Pen', 'Aluminum Laptop Stand', 'HD Webcam'] },
              { title: 'Science Lab Gear Kit', price: 599, original: 899, img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400', items: ['Cotton Chemistry Lab Coat', 'Maped Ruler & Stationery Pack', 'Lab Record Book', 'Casio Standard Calculator'] }
            ].map((combo, idx) => (
              <div key={idx} className="combo-card-custom">
                <img src={combo.img} alt={combo.title} className="combo-card-img" />
                <div className="combo-card-body">
                  <h4>{combo.title}</h4>
                  <ul className="combo-items-list-custom">
                    {combo.items.map((item, itemIdx) => (
                      <li key={itemIdx}>✓ {item}</li>
                    ))}
                  </ul>
                  <div className="combo-card-footer">
                    <div className="combo-price-info">
                      <span className="save-badge">Save {(((combo.original - combo.price)/combo.original)*100).toFixed(0)}%</span>
                      <div className="price-block-c">
                        <strong className="c-price">₹{combo.price}</strong>
                        <span className="c-orig">₹{combo.original}</span>
                      </div>
                    </div>
                    <button 
                      className="btn btn-primary add-combo-btn"
                      onClick={() => {
                        const dummyProduct = {
                          id: `combo-pack-${idx}`,
                          title: combo.title,
                          price: combo.price,
                          image: combo.img
                        };
                        handleAddToCart(dummyProduct, 'combo');
                      }}
                    >
                      Add Bundle
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Student Rewards Dashboard */}
          <div className="rewards-dashboard-panel">
            <h3>🎁 Referral & Student Rewards Program</h3>
            <div className="rewards-dashboard-grid">
              {/* Wallet stats */}
              <div className="reward-card-stat">
                <span>Your Wallet Balance</span>
                <strong>₹{walletBalance}</strong>
                <span className="reward-sub">Reward points: {walletBalance} pts</span>
              </div>

              {/* Referral details */}
              <div className="reward-card-stat">
                <span>Referral Balance Earned</span>
                <strong>₹150</strong>
                <span className="reward-sub">From 3 successful referrals</span>
              </div>

              {/* Refer links box */}
              <div className="reward-card-link-box">
                <h4>Share Your Invite Link</h4>
                <p>Get ₹50 in reward points for every freshman who registers and places their first order.</p>
                <div className="referral-link-row">
                  <input type="text" readOnly value="https://campushub.in/invite/RAJESH8390" className="invite-link-input" />
                  <button className="btn btn-primary invite-copy-btn" onClick={() => addToast('Referral link copied to clipboard!')}>Copy Link</button>
                </div>
              </div>
            </div>

            {/* Coupons list */}
            <div className="coupons-section-dashboard">
              <h4>Available Coupons</h4>
              <div className="coupons-deck">
                <div className="coupon-coupon-card">
                  <strong className="coupon-code">FRESHER10</strong>
                  <span>Flat 10% off for freshmen on hostel setup items</span>
                </div>
                <div className="coupon-coupon-card">
                  <strong className="coupon-code">EXAMPREP</strong>
                  <span>Save ₹100 on Exam Preparation Kits</span>
                </div>
                <div className="coupon-coupon-card">
                  <strong className="coupon-code">FREEGOURMET</strong>
                  <span>Free campus runner delivery on orders above ₹600</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. STUDENT PROFILE & SETTINGS */}
      {currentTab === 'profile' && (
        <div className="student-profile-container container">
          <div className="profile-wrapper-split">
            {/* Left sidebar card */}
            <div className="profile-details-card">
              <div className="profile-avatar-block">
                <img src={currentUser?.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"} alt="User avatar" />
                <span className="verified-student-badge">✓ Verified Student ID</span>
                <h3>{currentUser?.name || "Rajesh Kumar"}</h3>
                <p>Department: {studentDept} • {studentSem}</p>
                {currentUser && (
                  <button className="btn btn-secondary" onClick={() => {
                    setCurrentUser(null);
                    addToast('Logged out successfully');
                  }} style={{marginTop: '0.5rem'}}>
                    Logout
                  </button>
                )}
              </div>

              {/* Info Preferences forms */}
              <div className="profile-pref-form">
                <h4>Preference Setup</h4>
                
                <div className="pref-row">
                  <div className="pref-group">
                    <label>Hostel Block</label>
                    <select value={studentBlock} onChange={(e) => setStudentBlock(e.target.value)}>
                      <option value="H-1">H-1 Block</option>
                      <option value="H-2">H-2 Block</option>
                      <option value="H-3">H-3 Block</option>
                      <option value="H-4">H-4 Block</option>
                      <option value="PG-1">PG-1 Block</option>
                    </select>
                  </div>
                  <div className="pref-group">
                    <label>Room Number</label>
                    <input type="text" value={studentRoom} onChange={(e) => setStudentRoom(e.target.value)} placeholder="302" />
                  </div>
                </div>

                <div className="pref-group">
                  <label>Department Selection</label>
                  <select value={studentDept} onChange={(e) => setStudentDept(e.target.value)}>
                    <option value="Computer Science">Computer Science & Engineering</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Bio-Technology">Bio-Technology</option>
                    <option value="Business Administration">Business Administration</option>
                  </select>
                </div>

                <div className="pref-group">
                  <label>Semester Selection</label>
                  <select value={studentSem} onChange={(e) => setStudentSem(e.target.value)}>
                    <option value="Semester 1">Semester 1 (Freshman)</option>
                    <option value="Semester 3">Semester 3 (Sophomore)</option>
                    <option value="Semester 5">Semester 5 (Junior)</option>
                    <option value="Semester 7">Semester 7 (Senior)</option>
                  </select>
                </div>

                <button className="btn btn-primary save-pref-btn" onClick={() => addToast('Profile settings saved successfully!')}>
                  Save Preferences
                </button>
              </div>
            </div>

            {/* Right sidebar profile content */}
            <div className="profile-content-panel">
              {/* Wallet and balances */}
              <div className="profile-points-box">
                <div className="points-info-text">
                  <h3>CampusHub Student Wallet Balance</h3>
                  <p>Use student wallet points for one-tap payments on services & prints.</p>
                </div>
                <div className="points-display">
                  <strong>₹{walletBalance}</strong>
                  <span>Campus Wallet</span>
                </div>
              </div>

              {/* Saved Dorm Addresses */}
              <div className="profile-saved-addresses">
                <h4>Saved Delivery Locations</h4>
                <div className="addresses-list-deck">
                  {profileAddresses.map((addr, idx) => (
                    <div key={idx} className="address-card-row">
                      <span>📍 {addr}</span>
                      <button 
                        className="remove-address-btn"
                        onClick={() => {
                          setProfileAddresses(profileAddresses.filter((_, i) => i !== idx));
                          addToast('Address deleted');
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
                <div className="add-address-row">
                  <input 
                    type="text" 
                    placeholder="Add custom dorm delivery spot..." 
                    value={newProfileAddress}
                    onChange={(e) => setNewProfileAddress(e.target.value)}
                  />
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => {
                      if (!newProfileAddress.trim()) return;
                      setProfileAddresses([...profileAddresses, newProfileAddress.trim()]);
                      setNewProfileAddress('');
                      addToast('New delivery point saved!');
                    }}
                  >
                    + Add
                  </button>
                </div>
              </div>

              {/* Order History */}
              <div className="profile-order-history">
                <h4>Your Campus Orders</h4>
                <table className="profile-orders-table-custom">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Total Cost</th>
                      <th>Delivery Location</th>
                      <th>Delivery Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#CH-83920</td>
                      <td>2026-07-29</td>
                      <td>₹430</td>
                      <td>Hostel H-4, Room 302</td>
                      <td><span className="status-pill shipping">Out for Delivery</span></td>
                    </tr>
                    <tr>
                      <td>#CH-83815</td>
                      <td>2026-07-15</td>
                      <td>₹1299</td>
                      <td>Hostel H-4, Room 302</td>
                      <td><span className="status-pill completed">Completed</span></td>
                    </tr>
                    <tr>
                      <td>#CH-83601</td>
                      <td>2026-06-12</td>
                      <td>₹180</td>
                      <td>Central Library Desk 12</td>
                      <td><span className="status-pill completed">Completed</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. ADMIN CONTROL */}
      {currentTab === 'admin' && (
        <div className="admin-dashboard-container container">
          <div className="admin-dashboard-sidebar">
            <button className={`admin-tab-btn ${adminActiveTab === 'revenue' ? 'active' : ''}`} onClick={() => setAdminActiveTab('revenue')}>📈 Revenue & Analytics</button>
            <button className={`admin-tab-btn ${adminActiveTab === 'orders' ? 'active' : ''}`} onClick={() => setAdminActiveTab('orders')}>📦 Active Orders</button>
            <button className={`admin-tab-btn ${adminActiveTab === 'delivery' ? 'active' : ''}`} onClick={() => setAdminActiveTab('delivery')}>🏃 Delivery Partners</button>
            <button className={`admin-tab-btn ${adminActiveTab === 'inventory' ? 'active' : ''}`} onClick={() => setAdminActiveTab('inventory')}>📋 Inventory Stock</button>
            <button className={`admin-tab-btn ${adminActiveTab === 'users' ? 'active' : ''}`} onClick={() => setAdminActiveTab('users')}>👥 Users Status</button>
          </div>
          
          <div className="admin-dashboard-content">
            {adminActiveTab === 'revenue' && (
              <div className="admin-panel-fade">
                <h3 className="admin-section-title">Revenue & Analytics Dashboard</h3>
                <div className="admin-stats-grid">
                  <div className="stat-card">
                    <span>Daily Revenue</span>
                    <strong>₹42,850</strong>
                    <span className="trend positive">↑ 18% from yesterday</span>
                  </div>
                  <div className="stat-card">
                    <span>Active Customers Today</span>
                    <strong>312</strong>
                    <span className="trend positive">↑ 8% from yesterday</span>
                  </div>
                  <div className="stat-card">
                    <span>Average Basket Value</span>
                    <strong>₹480</strong>
                    <span className="trend negative">↓ 2% from last week</span>
                  </div>
                  <div className="stat-card">
                    <span>Total Items In Stock</span>
                    <strong>1,420</strong>
                    <span className="trend normal">Steady</span>
                  </div>
                </div>
                
                <div className="dashboard-chart-mock">
                  <h4>Order Volume (Last 24 Hours)</h4>
                  <div className="bar-chart-mock">
                    <div className="chart-bar" style={{ height: '40%' }}><span>8 AM</span></div>
                    <div className="chart-bar" style={{ height: '55%' }}><span>12 PM</span></div>
                    <div className="chart-bar" style={{ height: '85%' }}><span>4 PM</span></div>
                    <div className="chart-bar" style={{ height: '95%' }}><span>8 PM</span></div>
                    <div className="chart-bar" style={{ height: '70%' }}><span>12 AM</span></div>
                  </div>
                </div>
              </div>
            )}

            {adminActiveTab === 'orders' && (
              <div className="admin-panel-fade">
                <h3 className="admin-section-title">Active Orders Status</h3>
                <table className="admin-orders-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Items</th>
                      <th>Total Price</th>
                      <th>Hostel / Block</th>
                      <th>Runner</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#CH-83920</td>
                      <td>Trimax Pens, Classmate Notebooks</td>
                      <td>₹430</td>
                      <td>Hostel H-4, Room 302</td>
                      <td>Sarah M. (Junior)</td>
                      <td><span className="status-pill shipping">Out for Delivery</span></td>
                    </tr>
                    <tr>
                      <td>#CH-83921</td>
                      <td>Scientific Calculator, Files</td>
                      <td>₹1374</td>
                      <td>Hostel H-1, Room 104</td>
                      <td>Daniel T. (Sophomore)</td>
                      <td><span className="status-pill pending">Packing</span></td>
                    </tr>
                    <tr>
                      <td>#CH-83922</td>
                      <td>Laundry Basket, Bed Sheet</td>
                      <td>₹698</td>
                      <td>Hostel H-2, Room 410</td>
                      <td>Pooja V. (Senior)</td>
                      <td><span className="status-pill completed">Completed</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {adminActiveTab === 'delivery' && (
              <div className="admin-panel-fade">
                <h3 className="admin-section-title">Delivery Partner Runners</h3>
                <div className="runner-profiles-grid">
                  <div className="runner-card">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="Daniel" />
                    <div className="runner-info">
                      <strong>Daniel T. (Sophomore)</strong>
                      <span>Active Orders: 1</span>
                      <span>Rating: 4.8★</span>
                      <span className="status active">Active on Shift</span>
                    </div>
                  </div>
                  <div className="runner-card">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="Sarah" />
                    <div className="runner-info">
                      <strong>Sarah M. (Junior)</strong>
                      <span>Active Orders: 1</span>
                      <span>Rating: 4.9★</span>
                      <span className="status active">On Delivery</span>
                    </div>
                  </div>
                  <div className="runner-card">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100" alt="Rajesh" />
                    <div className="runner-info">
                      <strong>Rajesh K. (Senior)</strong>
                      <span>Active Orders: 0</span>
                      <span>Rating: 4.7★</span>
                      <span className="status inactive">Offline</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {adminActiveTab === 'inventory' && (
              <div className="admin-panel-fade">
                <h3 className="admin-section-title">Inventory Stock Logs</h3>
                <table className="admin-orders-table">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Stock Count</th>
                      <th>Alert Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Classmate Pulse Registers</td>
                      <td>Study Essentials</td>
                      <td>85 units</td>
                      <td><span className="status-pill completed">In Stock</span></td>
                    </tr>
                    <tr>
                      <td>Casio Scientific Calculator FX-991EX</td>
                      <td>Study Essentials</td>
                      <td>12 units</td>
                      <td><span className="status-pill pending">Low Stock</span></td>
                    </tr>
                    <tr>
                      <td>Trimax Gel Pens (Blue)</td>
                      <td>Study Essentials</td>
                      <td>150 units</td>
                      <td><span className="status-pill completed">In Stock</span></td>
                    </tr>
                    <tr>
                      <td>Plastic Wash Bucket (18L)</td>
                      <td>Hostel Essentials</td>
                      <td>4 units</td>
                      <td><span className="status-pill shipping">Reorder Alert</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {adminActiveTab === 'users' && (
              <div className="admin-panel-fade">
                <h3 className="admin-section-title">Verified Student Users</h3>
                <table className="admin-orders-table">
                  <thead>
                    <tr>
                      <th>Student Name</th>
                      <th>Department & Year</th>
                      <th>Active Address</th>
                      <th>Verification Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Rajesh Kumar</td>
                      <td>Computer Science, Junior</td>
                      <td>Hostel Block H-4 Room 302</td>
                      <td><span className="status-pill completed">Verified ID</span></td>
                    </tr>
                    <tr>
                      <td>Sarah Morris</td>
                      <td>Computer Science, Junior</td>
                      <td>Hostel Block H-1 Room 204</td>
                      <td><span className="status-pill completed">Verified ID</span></td>
                    </tr>
                    <tr>
                      <td>Daniel Taneja</td>
                      <td>Bio-Technology, Sophomore</td>
                      <td>Hostel Block H-3 Room 102</td>
                      <td><span className="status-pill completed">Verified ID</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AI Shopping Assistant Widget (Always accessible) */}
      <div className={`ai-assistant-widget ${aiChatOpen ? 'expanded' : ''}`}>
        {aiChatOpen ? (
          <div className="ai-chat-window">
            <div className="ai-chat-header">
              <h4>🧠 CampusHub AI Assistant</h4>
              <button className="ai-chat-close-btn" onClick={() => setAiChatOpen(false)}>×</button>
            </div>
            <div className="ai-chat-body">
              {aiMessages.map((msg, idx) => (
                <div key={idx} className={`chat-message ${msg.sender}`}>
                  <div className="chat-bubble">{msg.text}</div>
                </div>
              ))}
            </div>
            <form className="ai-chat-footer" onSubmit={(e) => {
              e.preventDefault();
              if (!aiInput.trim()) return;
              const userMsg = aiInput;
              setAiMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
              setAiInput('');
              
              setTimeout(() => {
                const query = userMsg.toLowerCase();
                let reply = '';
                if (query.includes('exam kit') || query.includes('exam')) {
                  reply = 'I recommend the "Semester Exam Prep Kit" (₹1499) which contains registers, pens, and a calculator. It is located in the Combos & Offers tab.';
                } else if (query.includes('hostel') || query.includes('room')) {
                  reply = 'For hostel setups, check the Dorm Store / Hostel category or our Freshers Starter Kit in the Combos page which includes a bucket, mug, hangers, sheet and lock for ₹999.';
                } else if (query.includes('500') || query.includes('cheap')) {
                  reply = 'Items under ₹500: Trimax Pens (₹250), LED Study Lamps (₹399), Plastic Buckets (₹249), Coffee Mugs (₹150), and Chemistry Lab Coats (₹150 on second-hand marketplace).';
                } else if (query.includes('laptop') || query.includes('accessories')) {
                  reply = 'We have Laptop stands (₹799), Wireless Mouse (₹299), mechanical keyboards (₹599) in the Dorm Store, or laptop cleaning service (₹799) in the Services booking page.';
                } else {
                  reply = 'I can guide you to printing PDF files, buying second-hand textbooks, scheduling room cleans, or ordering exam kits. Tell me what you need!';
                }
                setAiMessages(prev => [...prev, { sender: 'ai', text: reply }]);
              }, 800);
            }}>
              <input 
                type="text" 
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="Ask AI (e.g. Exam Kit...)" 
              />
              <button type="submit">Send</button>
            </form>
          </div>
        ) : (
          <button className="ai-assistant-badge-btn" onClick={() => setAiChatOpen(true)}>
            🧠 Ask AI Assistant
          </button>
        )}
      </div>
      </main>

      {/* ==========================================
           MODERN FOOTER
           ========================================== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <a href="#" className="footer-logo" onClick={(e) => { e.preventDefault(); window.scrollTo(0,0); }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                </svg>
                Campus<span>Hub</span>
              </a>
              <p className="footer-desc">
                CampusHub is hyperlocal campus commerce. Sourcing and delivering student utilities, kits, prints, and products directly to dorm floors in 15 minutes.
              </p>
              <div className="footer-socials">
                <a href="#" className="social-link" aria-label="CampusHub Instagram">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" class="social-link" aria-label="CampusHub Twitter">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="#" class="social-link" aria-label="CampusHub LinkedIn">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-column">
              <h4>Platform</h4>
              <ul className="footer-links">
                <li><a href="#featured-products">Shop Products</a></li>
                <li><a href="#services">Campus Services</a></li>
                <li><a href="#marketplace">Marketplace</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setSellerOpen(true); }}>Become a Seller</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Student Support</h4>
              <ul className="footer-links">
                <li><a href="#" onClick={(e) => { e.preventDefault(); setTrackOpen(true); }}>Track Your Order</a></li>
                <li><a href="#">Help Center & FAQs</a></li>
                <li><a href="#">Contact Support</a></li>
                <li><a href="#">Hostel Runners Directory</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Legal</h4>
              <ul className="footer-links">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Student Code of Conduct</a></li>
                <li><a href="#">Refund & Return Policy</a></li>
              </ul>
            </div>

            <div className="footer-newsletter">
              <h4>Get Discount Coupons</h4>
              <p className="newsletter-desc">Subscribe to get weekly flash coupon codes and deal alerts sent straight to your student inbox.</p>
              <form class="newsletter-form" onSubmit={handleNewsletterSubmit}>
                <input 
                  type="email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="student@university.edu" 
                  required 
                  aria-label="Student Email for Newsletter"
                />
                <button type="submit" className="btn-newsletter-submit">Join</button>
              </form>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 CampusHub. Built by college students for college students.</p>
            <div className="footer-bottom-links">
              <span>Stripe Verified</span>
              <span>Apple Pay Integrated</span>
              <span>Notion Inspired</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ==========================================
           MODALS, DRAWER, & OVERLAYS
           ========================================== */}

      {/* 1. LOGIN MODAL */}
      <div className={`modal-backdrop ${loginOpen ? 'open' : ''}`}>
        <div className="modal-content" role="dialog" aria-modal="true">
          <button className="modal-close" onClick={() => setLoginOpen(false)}>×</button>
          <div className="modal-header">
            <h3>Welcome Back</h3>
            <p>Login using your verified university email</p>
          </div>
          <form onSubmit={handleLoginSubmit}>
            <div className="modal-form-group">
              <label>University Email</label>
              <input 
                type="email" 
                className="modal-input" 
                placeholder="name@college.edu" 
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required 
              />
            </div>
            <div className="modal-form-group">
              <label>Password</label>
              <input 
                type="password" 
                className="modal-input" 
                placeholder="••••••••" 
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required 
              />
            </div>
            <div className="modal-flex-row">
              <label className="modal-checkbox">
                <input type="checkbox" defaultChecked />
                <span>Remember me</span>
              </label>
              <a href="#" className="modal-forgot-link" onClick={(e) => e.preventDefault()}>Forgot Password?</a>
            </div>
            <button type="submit" className="btn btn-primary modal-btn-submit">Login</button>
          </form>
          <p className="modal-footer-text">Don't have an account? <a href="#" onClick={(e) => e.preventDefault()}>Create Student Account</a></p>
        </div>
      </div>

      {/* 2. BECOME A SELLER MODAL */}
      <div className={`modal-backdrop ${sellerOpen ? 'open' : ''}`}>
        <div className="modal-content" role="dialog" aria-modal="true" style={{ maxWidth: '520px' }}>
          <button className="modal-close" onClick={() => setSellerOpen(false)}>×</button>
          <div className="modal-header">
            <h3>List on CampusHub</h3>
            <p>Sell reference books, calculators, and tools directly to peers.</p>
          </div>
          <form onSubmit={handleSellerSubmit}>
            <div className="modal-form-group">
              <label>Your Full Name</label>
              <input 
                type="text" 
                className="modal-input" 
                placeholder="Rajesh Kumar" 
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
                required 
              />
            </div>
            <div className="modal-form-group">
              <label>Major / Department & Year</label>
              <input 
                type="text" 
                className="modal-input" 
                placeholder="EE, Sophomore" 
                value={sellerDept}
                onChange={(e) => setSellerDept(e.target.value)}
                required 
              />
            </div>
            <div className="modal-form-group">
              <label>Item Name / Title</label>
              <input 
                type="text" 
                className="modal-input" 
                placeholder="Casio FX-991EX Scientific Calculator" 
                value={sellerItem}
                onChange={(e) => setSellerItem(e.target.value)}
                required 
              />
            </div>
            <div className="modal-form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1rem' }}>
              <div>
                <label>Price (₹)</label>
                <input 
                  type="number" 
                  className="modal-input" 
                  placeholder="15.00" 
                  step="0.01" 
                  value={sellerPrice}
                  onChange={(e) => setSellerPrice(e.target.value)}
                  required 
                />
              </div>
              <div>
                <label>Condition</label>
                <select 
                  className="modal-input" 
                  style={{ height: '43px', display: 'block' }} 
                  value={sellerCondition}
                  onChange={(e) => setSellerCondition(e.target.value)}
                  required
                >
                  <option value="excellent">Like New (Excellent)</option>
                  <option value="good">Good (Used)</option>
                  <option value="fair">Fair (Decent)</option>
                </select>
              </div>
            </div>
            <div className="modal-form-group">
              <label>Item Description</label>
              <textarea 
                className="modal-input" 
                rows="3" 
                placeholder="Explain highlights, markings, chargers included..." 
                style={{ resize: 'none' }} 
                value={sellerDesc}
                onChange={(e) => setSellerDesc(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary modal-btn-submit">List Item Now</button>
          </form>
        </div>
      </div>

      {/* 3. TRACK ORDER MODAL */}
      <div className={`modal-backdrop ${trackOpen ? 'open' : ''}`}>
        <div className="modal-content" role="dialog" aria-modal="true">
          <button className="modal-close" onClick={() => { setTrackOpen(false); setTrackStatusResult(null); setTrackInput(''); }}>×</button>
          <div className="modal-header">
            <h3>Track Campus Order</h3>
            <p>Enter your CampusHub order number below to check progress</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <input 
              type="text" 
              className="modal-input" 
              placeholder="Order ID (e.g. CH-12345)" 
              value={trackInput}
              onChange={(e) => setTrackInput(e.target.value)}
              style={{ margin: 0 }} 
            />
            <button className="btn btn-primary" style={{ padding: '0.75rem 1.25rem' }} onClick={handleTrackLookup}>Track</button>
          </div>

          <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
            {trackStatusResult === null ? (
              <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem', padding: '1.5rem 0' }}>
                Lookup "<strong>CH-12345</strong>" to test the live tracking animation flow!
              </p>
            ) : trackStatusResult.error ? (
              <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-secondary)' }}>
                <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ marginBottom: '0.75rem', color: '#ef4444', marginLeft: 'auto', marginRight: 'auto' }}>
                  <path d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"></path>
                </svg>
                <h4>Order ID not found</h4>
                <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>Try looking up "CH-12345" for a mock active delivery demonstration.</p>
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: '1.5rem', backgroundColor: 'var(--primary-light)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)' }}>
                    <span>Order #{trackStatusResult.orderId}</span>
                    <span>Est. Delivery: {trackStatusResult.estTime}</span>
                  </div>
                </div>
                {trackStatusResult.steps.map((step, idx) => (
                  <div key={idx} className={`track-step ${step.status}`}>
                    <div className="track-icon">
                      {step.status === 'completed' ? '✓' : step.status === 'active' ? '🚚' : '•'}
                    </div>
                    <div className="track-details">
                      <h4>{step.title}</h4>
                      <p>{step.desc}</p>
                      <span>{step.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5. PRODUCT DETAIL MODAL */}
      <div className={`modal-backdrop product-detail-modal-backdrop ${selectedProduct ? 'open' : ''}`} onClick={(e) => { if (e.target.classList.contains('product-detail-modal-backdrop')) setSelectedProduct(null); }}>
        <div className="product-detail-modal" role="dialog" aria-modal="true">
          <button className="modal-close" onClick={() => setSelectedProduct(null)}>×</button>
          {selectedProduct && (
            <div className="product-detail-container">
              <div className="product-detail-main">
                {/* Image Section */}
                <div className="product-detail-image-sec">
                  <img src={selectedProduct.image} alt={selectedProduct.title} className="product-detail-img" />
                  {selectedProduct.tag && <span className="product-detail-tag-badge">{selectedProduct.tag}</span>}
                </div>
                
                {/* Info Section */}
                <div className="product-detail-info-sec">
                  <span className="product-detail-category-label">
                    {selectedProduct.categoryLabel || (selectedProduct.id.startsWith('market-') ? 'Second-Hand Marketplace' : 'Super Saver Combo')}
                  </span>
                  <h2 className="product-detail-title">{selectedProduct.title}</h2>
                  
                  {selectedProduct.conditionLabel && (
                    <span className={`market-condition cond-${selectedProduct.condition} product-detail-condition`}>
                      {selectedProduct.conditionLabel}
                    </span>
                  )}
                  
                  <div className="product-detail-meta">
                    {selectedProduct.rating && (
                      <div className="product-rating">
                        <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                        </svg>
                        <span>{selectedProduct.rating} ({selectedProduct.reviews} reviews)</span>
                      </div>
                    )}
                    <span className="product-detail-delivery-badge">
                      {selectedProduct.delivery || 'Available on Campus'}
                    </span>
                  </div>

                  <div className="product-detail-divider"></div>

                  <div className="product-detail-purchase-row">
                    <div className="product-detail-price-block">
                      <span className="product-detail-price">₹{selectedProduct.price.toFixed(0)}</span>
                      {selectedProduct.originalPrice && (
                        <span className="product-detail-original-price">₹{selectedProduct.originalPrice.toFixed(0)}</span>
                      )}
                    </div>

                    <div className="product-detail-action-block">
                      {(() => {
                        const cartItem = cart.find(i => i.id === selectedProduct.id);
                        const qty = cartItem ? cartItem.quantity : 0;
                        if (qty === 0) {
                          return (
                            <button className="btn-blinkit-add" onClick={() => handleAddToCart(selectedProduct, selectedProduct.id.startsWith('combo') ? 'combo' : 'product')}>
                              ADD
                            </button>
                          );
                        } else {
                          return (
                            <div className="blinkit-qty-controls">
                              <button onClick={() => handleUpdateQty(selectedProduct.id, -1)}>−</button>
                              <span>{qty}</span>
                              <button onClick={() => handleUpdateQty(selectedProduct.id, 1)}>+</button>
                            </div>
                          );
                        }
                      })()}
                    </div>
                  </div>

                  <div className="product-detail-divider"></div>

                  {selectedProduct.desc && (
                    <div className="product-detail-desc-sec">
                      <h4>Product Description</h4>
                      <p>{selectedProduct.desc}</p>
                    </div>
                  )}

                  {selectedProduct.items && (
                    <div className="product-detail-items-sec">
                      <h4>Combo Items Included:</h4>
                      <ul className="combo-items-list" style={{ marginTop: '0.5rem' }}>
                        {selectedProduct.items.map((item, idx) => (
                          <li key={idx} className="combo-item">
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" style={{ marginRight: '6px', color: 'var(--success)' }}>
                              <path d="M20 6L9 17l-5-5"></path>
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedProduct.seller && (
                    <div className="product-detail-seller-card">
                      <div className="market-seller-badge" style={{ position: 'static', marginBottom: '0.75rem' }}>
                        <img src={selectedProduct.sellerImg} alt={selectedProduct.seller} />
                        <div>
                          <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-primary)' }}>{selectedProduct.seller}</strong>
                          <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Verified Campus Seller</span>
                        </div>
                      </div>
                      <button 
                        className="btn btn-secondary btn-contact-seller" 
                        onClick={() => handleContactSeller(selectedProduct.seller, selectedProduct.title)}
                        style={{ marginTop: '0.5rem', width: '100%' }}
                      >
                        Contact Seller
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Related Products Section */}
              <div className="related-products-section">
                <h3 className="related-products-heading">Related Products</h3>
                <div className="related-products-grid">
                  {relatedProducts.map(rel => {
                    return (
                      <div key={rel.id} className="related-product-card" onClick={() => setSelectedProduct(rel)}>
                        <div className="related-product-img-box">
                          <img src={rel.image} alt={rel.title} />
                        </div>
                        <div className="related-product-body">
                          <h4 className="related-product-title">{rel.title}</h4>
                          <div className="related-product-footer">
                            <span className="related-product-price">₹{rel.price.toFixed(0)}</span>
                            <button 
                              className="btn-blinkit-add-sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(rel, rel.id.startsWith('combo') ? 'combo' : 'product');
                              }}
                            >
                              ADD
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

        {/* 4. SLIDING WISHLIST DRAWER */}
        <div className={`cart-drawer-backdrop ${wishlistOpen ? 'open' : ''}`} onClick={(e) => { if (e.target.classList.contains('cart-drawer-backdrop')) setWishlistOpen(false); }}>
          <div className="cart-drawer" role="dialog" aria-modal="true">
            <div className="cart-drawer-header" style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                <svg width="20" height="20" fill="currentColor" style={{ color: 'var(--accent)' }} viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                Your Wishlist
              </h3>
              <button className="cart-drawer-close" onClick={() => setWishlistOpen(false)}>×</button>
            </div>
            
            <div className="cart-items-container">
              {wishlist.length === 0 ? (
                <div className="empty-cart-message">
                  <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"></path>
                  </svg>
                  <p>Your wishlist is empty</p>
                  <span>Heart items across the store to save them here</span>
                </div>
              ) : (
                wishlist.map(itemId => {
                  const item = PRODUCTS.find(p => p.id === itemId) || COMBOS.find(c => c.id === itemId) || MARKETPLACE.find(m => m.id === itemId);
                  if (!item) return null;
                  return (
                    <div key={item.id} className="cart-item">
                      <img src={item.image} alt={item.title} className="cart-item-image" />
                      <div className="cart-item-details">
                        <div>
                          <h4 className="cart-item-title">{item.title}</h4>
                        </div>
                        <div className="cart-item-price-row" style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                          <span className="cart-item-price" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>₹{item.price.toFixed(0)}</span>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <button 
                              className="btn btn-primary" 
                              style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', fontWeight: 600, borderRadius: 'var(--radius-md)' }}
                              onClick={() => {
                                handleAddToCart(item, item.id.startsWith('combo') ? 'combo' : 'product');
                                setWishlist(prev => prev.filter(id => id !== item.id));
                              }}
                            >
                              Add to Cart
                            </button>
                            <button 
                              className="cart-item-remove" 
                              style={{ fontSize: '0.75rem', color: '#ef4444' }} 
                              onClick={() => handleToggleWishlist(item.id, item.title)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* 5. SLIDING CART DRAWER */}
      <div className={`cart-drawer-backdrop ${cartOpen ? 'open' : ''}`} onClick={(e) => { if (e.target.classList.contains('cart-drawer-backdrop')) setCartOpen(false); }}>
        <div className="cart-drawer" role="dialog" aria-modal="true">
          <div className="cart-drawer-header">
            <h3>Your Cart Bag</h3>
            <button className="cart-drawer-close" onClick={() => setCartOpen(false)}>×</button>
          </div>
          
          <div className="cart-items-container">
            {cart.length === 0 ? (
              <div className="empty-cart-message">
                <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0z"></path>
                </svg>
                <p>Your shopping cart is empty</p>
                <span>Add items to get fast door-step delivery</span>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.title} className="cart-item-image" />
                  <div className="cart-item-details">
                    <div>
                      <h4 className="cart-item-title">{item.title}</h4>
                    </div>
                    <div className="cart-item-price-row">
                      <span className="cart-item-price">₹{(item.price * item.quantity).toFixed(0)}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div className="cart-item-quantity">
                          <button className="qty-btn" onClick={() => handleUpdateQty(item.id, -1)}>-</button>
                          <div className="qty-val">{item.quantity}</div>
                          <button className="qty-btn" onClick={() => handleUpdateQty(item.id, 1)}>+</button>
                        </div>
                        <button className="cart-item-remove" onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="cart-drawer-footer">
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(0)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Campus Runner Delivery</span>
              <span>₹{deliveryCharge.toFixed(0)}</span>
            </div>
            <div className="cart-summary-row total">
              <span>Total</span>
              <span>₹{(subtotal + deliveryCharge).toFixed(0)}</span>
            </div>
            <button 
              className="btn btn-accent btn-checkout" 
              onClick={() => { addToast('Checkout simulated! Payment screen loaded.'); setCartOpen(false); }}
              disabled={cart.length === 0}
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>

      {/* TOAST SYSTEM CONTAINER */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.isError ? 'toast-error' : ''}`}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              {t.isError ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
              )}
            </svg>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </>
  );
}
