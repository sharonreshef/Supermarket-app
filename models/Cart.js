const mongoose = require('mongoose');
const { Item } = require('./Item');

const CartSchema = mongoose.Schema({
  customerID: { type: String, required: true },
  dateCreated: { type: Date, required: true },
  products: { type: [Item] }
});

module.exports = Cart = mongoose.model('cart', CartSchema);
