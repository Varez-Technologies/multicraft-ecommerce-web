const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  productId: { type: String },
  title: { type: String, required: true },
  image: { type: String },
  category: { type: String },
  size: {
    id: String,
    label: String,
    priceDelta: Number
  },
  frame: {
    id: String,
    name: String,
    priceDelta: Number
  },
  quantity: { type: Number, required: true, default: 1 },
  itemPrice: { type: Number, required: true }
});

const OrderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  customer: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    notes: { type: String, default: '' }
  },
  items: [OrderItemSchema],
  subtotal: { type: Number, required: true },
  deliveryFee: { type: Number, required: true, default: 0 },
  total: { type: Number, required: true },
  paymentMethod: { type: String, default: 'Cash on Delivery (COD)' },
  status: { 
    type: String, 
    default: 'Pending', 
    enum: ['Pending', 'Confirmed', 'Dispatched', 'Delivered', 'Cancelled'] 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
