const mongoose = require('mongoose');
const { Item } = require('./Item');

const OrderSchema = mongoose.Schema({
  creator: { type: mongoose.Schema.Types.String },
  products: { type: [Item] },
  totalPrice: { type: Number, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  ShippingDate: { type: Date, required: true },
  last4CreditDigit: { type: Number, required: true },
  date: { type: mongoose.Schema.Types.Date, default: Date.now }
});

// const Order = mongoose.model('Order', OrederSchema);
// module.exports = Order;
module.exports = Order = mongoose.model('order', OrderSchema);
