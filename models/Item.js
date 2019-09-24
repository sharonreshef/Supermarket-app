const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  cartId: { type: String, required: true }
});

module.exports = Item = mongoose.model('item', ItemSchema);
