const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Motivational', 'Automotive', 'Gaming', 'Urdu Poetry'] 
  },
  basePrice: { type: Number, required: true },
  image: { type: String, required: true },
  badge: { type: String, default: 'New' },
  featured: { type: Boolean, default: false },
  description: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);
