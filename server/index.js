const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Product = require('./models/Product');
const Order = require('./models/Order');
const Review = require('./models/Review');
const authMiddleware = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory fallback if MongoDB connection fails initially
let memoryProducts = [
  {
    _id: "1",
    title: "Porsche 911 GT3 RS Neon Track",
    category: "Automotive",
    basePrice: 1999,
    image: "/products/art_1.jpg",
    badge: "Best Seller",
    featured: true,
    description: "High-definition motorsport aesthetic featuring the iconic Porsche 911 in dynamic track lighting."
  },
  {
    _id: "2",
    title: "Dream Plan Do Repeat - Minimalist Hustle",
    category: "Motivational",
    basePrice: 1799,
    image: "/products/art_2.jpg",
    badge: "Trending",
    featured: true,
    description: "Inspiring clean typographic art engineered to keep you focused on your ambition every single day."
  },
  {
    _id: "3",
    title: "Mirza Ghalib - Ishq Par Zor Nahin",
    category: "Urdu Poetry",
    basePrice: 2199,
    image: "/products/art_3.jpg",
    badge: "Heritage",
    featured: true,
    description: "Exquisite Urdu calligraphy capturing timeless poetic expression. Crafted on textured fine-art canvas."
  },
  {
    _id: "4",
    title: "Cyberpunk Gamer Battlestation Glitch",
    category: "Gaming",
    basePrice: 1899,
    image: "/products/art_4.jpg",
    badge: "New Drop",
    featured: true,
    description: "Vibrant neon cyberpunk aesthetic with futuristic glowing elements for the ultimate modern gaming setup."
  },
  {
    _id: "5",
    title: "G-Wagon Matte Black Powerhouse",
    category: "Automotive",
    basePrice: 2299,
    image: "/products/art_5.jpg",
    badge: "Popular",
    featured: true,
    description: "Bold monochromatic aesthetic showcasing the raw luxury and dominance of the Mercedes-AMG G63."
  },
  {
    _id: "6",
    title: "Good Things Take Time - Golden Hour",
    category: "Motivational",
    basePrice: 1699,
    image: "/products/art_6.jpg",
    badge: "Classic",
    featured: false,
    description: "Subtle reminder of patience and mastery. Warm tones and modern layout designed for mindful living."
  },
  {
    _id: "7",
    title: "Jaun Elia - Shayad Khamoshi Mein",
    category: "Urdu Poetry",
    basePrice: 2099,
    image: "/products/art_7.jpg",
    badge: "Exclusive",
    featured: true,
    description: "Deep, soulful typography honoring the legendary poet Jaun Elia in luxury gold foil and black canvas."
  },
  {
    _id: "8",
    title: "Retro Arcade 1989 Neon Synthwave",
    category: "Gaming",
    basePrice: 1999,
    image: "/products/art_8.jpg",
    badge: "Trending",
    featured: false,
    description: "Nostalgic 80s arcade vibe with glowing purple and cyan accents, perfect for game rooms and workspaces."
  }
];

let memoryOrders = [];
let isDbConnected = false;

// Middleware to ensure MongoDB connection in serverless (Vercel) & standard environments
app.use(async (req, res, next) => {
  if (mongoose.connection.readyState !== 1 && process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000
      });
      isDbConnected = true;
    } catch (err) {
      console.warn('⚠️ Serverless DB connect attempt:', err.message);
    }
  } else if (mongoose.connection.readyState === 1) {
    isDbConnected = true;
  }
  next();
});

// Initial startup connection
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
    .then(() => { isDbConnected = true; })
    .catch(() => {});
}

// =================== PUBLIC API ROUTES =================== //

// Health & DB Status Check
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    store: 'MultiCraft Store API',
    databaseConnected: isDbConnected,
    mode: isDbConnected ? 'MongoDB Cloud/Local' : 'Memory Cache (Ready for Atlas URI)'
  });
});

// GET all products
app.get('/api/products', async (req, res) => {
  try {
    if (isDbConnected) {
      const products = await Product.find().sort({ createdAt: -1 });
      return res.json(products);
    }
    res.json(memoryProducts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// POST new order (Customer checkout)
app.post('/api/orders', async (req, res) => {
  try {
    const { customer, items, subtotal, deliveryFee, total } = req.body;
    
    if (!customer || !customer.name || !customer.phone || !customer.address || !items || items.length === 0) {
      return res.status(400).json({ error: 'Missing mandatory order information' });
    }

    const orderNumber = 'MC-' + Math.floor(100000 + Math.random() * 900000);
    const orderData = {
      orderNumber,
      customer,
      items,
      subtotal,
      deliveryFee,
      total,
      paymentMethod: 'Cash on Delivery (COD)',
      status: 'Pending',
      createdAt: new Date()
    };

    if (isDbConnected) {
      const created = await Order.create(orderData);
      return res.status(201).json({ success: true, order: created });
    } else {
      const created = { _id: Date.now().toString(), ...orderData };
      memoryOrders.unshift(created);
      return res.status(201).json({ success: true, order: created });
    }
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// =================== SECURE ADMIN AUTHENTICATION =================== //

// Admin Login Route (Secret credentials check)
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL || 'hello.multicraft@gmail.com';
  const adminPass = process.env.ADMIN_PASSWORD || 'multicraft_owner_2026';

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  if (email.trim().toLowerCase() !== adminEmail.toLowerCase() || password !== adminPass) {
    return res.status(401).json({ error: 'Invalid admin credentials! Access denied.' });
  }

  // Generate secure JWT token (valid for 7 days)
  const token = jwt.sign(
    { role: 'admin', email: adminEmail },
    process.env.JWT_SECRET || 'multicraft_super_secure_jwt_secret_key_2026_pk',
    { expiresIn: '7d' }
  );

  res.json({
    success: true,
    message: 'Welcome back, MultiCraft Owner!',
    token,
    admin: { email: adminEmail, role: 'owner' }
  });
});

// Verify token
app.get('/api/admin/verify', authMiddleware, (req, res) => {
  res.json({ valid: true, admin: req.admin });
});

// =================== PROTECTED ADMIN ROUTES (AUTH REQUIRED) =================== //

// GET all orders (Protected)
app.get('/api/admin/orders', authMiddleware, async (req, res) => {
  try {
    if (isDbConnected) {
      const orders = await Order.find().sort({ createdAt: -1 });
      return res.json(orders);
    }
    res.json(memoryOrders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load orders' });
  }
});

// UPDATE order status (Protected)
app.patch('/api/admin/orders/:id', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    if (isDbConnected) {
      const updated = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
      return res.json(updated);
    } else {
      const found = memoryOrders.find(o => o._id === req.params.id || o.orderNumber === req.params.id);
      if (found) found.status = status;
      return res.json(found || {});
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// DELETE order (Protected)
app.delete('/api/admin/orders/:id', authMiddleware, async (req, res) => {
  try {
    if (isDbConnected) {
      await Order.findByIdAndDelete(req.params.id);
    } else {
      memoryOrders = memoryOrders.filter(o => o._id !== req.params.id);
    }
    res.json({ success: true, message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

// POST new product (Protected)
app.post('/api/admin/products', authMiddleware, async (req, res) => {
  try {
    const { title, category, basePrice, image, badge, description } = req.body;
    const newProduct = {
      title,
      category,
      basePrice: Number(basePrice),
      image: image || '/products/art_1.jpg',
      badge: badge || 'New',
      description: description || 'Handcrafted fine-art canvas frame.'
    };

    if (isDbConnected) {
      const created = await Product.create(newProduct);
      return res.status(201).json(created);
    } else {
      const created = { _id: Date.now().toString(), ...newProduct };
      memoryProducts.unshift(created);
      return res.status(201).json(created);
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// DELETE product (Protected)
app.delete('/api/admin/products/:id', authMiddleware, async (req, res) => {
  try {
    if (isDbConnected) {
      await Product.findByIdAndDelete(req.params.id);
    } else {
      memoryProducts = memoryProducts.filter(p => p._id !== req.params.id);
    }
    res.json({ success: true, message: 'Product removed from catalog' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// =================== PUBLIC REVIEWS API =================== //

// GET all approved reviews
app.get('/api/reviews', async (req, res) => {
  try {
    if (isDbConnected) {
      const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 });
      return res.json(reviews);
    }
    res.json([]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// POST submit new review (public - goes to pending)
app.post('/api/reviews', async (req, res) => {
  try {
    const { name, city, rating, text } = req.body;
    if (!name || !city || !rating || !text) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    if (text.length < 10) {
      return res.status(400).json({ error: 'Review must be at least 10 characters.' });
    }

    const review = { name, city, rating: Number(rating), text, approved: false };

    if (isDbConnected) {
      const created = await Review.create(review);
      return res.status(201).json({ success: true, message: 'Review submitted! It will appear after approval.', review: created });
    }
    res.status(201).json({ success: true, message: 'Review submitted! It will appear after approval.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

// =================== ADMIN REVIEWS API =================== //

// GET all reviews including pending (admin)
app.get('/api/admin/reviews', authMiddleware, async (req, res) => {
  try {
    if (isDbConnected) {
      const reviews = await Review.find().sort({ createdAt: -1 });
      return res.json(reviews);
    }
    res.json([]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// PATCH approve/reject review (admin)
app.patch('/api/admin/reviews/:id', authMiddleware, async (req, res) => {
  try {
    const { approved } = req.body;
    if (isDbConnected) {
      const updated = await Review.findByIdAndUpdate(req.params.id, { approved }, { new: true });
      return res.json(updated);
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update review' });
  }
});

// DELETE review (admin)
app.delete('/api/admin/reviews/:id', authMiddleware, async (req, res) => {
  try {
    if (isDbConnected) {
      await Review.findByIdAndDelete(req.params.id);
    }
    res.json({ success: true, message: 'Review deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

// Start server
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 MultiCraft Backend Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
