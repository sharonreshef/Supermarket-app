const mongoose = require('mongoose');

const OrederSchema = mongoose.Schema({
  creator: { type: mongoose.Schema.Types.String },
  products: [],
  date: { type: mongoose.Schema.Types.Date, default: Date.now }
});

const Order = mongoose.model('Order', OrederSchema);
module.exports = Order;
