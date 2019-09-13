const mongoose = require('mongoose');
const { Category } = require('./Category');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  categoryName: {
    type: String,
    required: true
    // validate: {
    //   async validator(categoryName) {
    //     const categories = await Category.find();
    //     return categories.some(
    //       category => category.categoryName === categoryName
    //     );
    //   },
    //   message: props => `${props.value} is an unknown category`
    // }
  },
  price: { type: Number, min: 0.1, required: true },
  image: { type: String, required: true }
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;

// module.exports = Product = mongoose.model('product', ProductSchema);
