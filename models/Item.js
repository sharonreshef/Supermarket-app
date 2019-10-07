const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  cartId: { type: String, required: true }
});

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;

// module.exports = Item = mongoose.model('item', ItemSchema);
