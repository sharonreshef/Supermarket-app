var express = require('express');
var router = express.Router();
var Cart = require('../models/Cart');
var auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  const customerID = req.customer.customerID;
  const dateCreated = new Date();
  const cart = new Cart({
    customerID,
    dateCreated
  });
  try {
    const document = await cart.save();
    res.status(200).json(document);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post('/:cartId', auth, async (req, res) => {
  const cartId = req.params;
  const { productId } = req.body;
  const { amount } = req.body;
  console.log(productId);

  try {
    const cart = await Cart.findById(cartId.cartId).exec();
    const product = await Product.findById(productId);
    const price = product.price * amount;

    const item = new Item({
      productId: product.id,
      amount: amount,
      price: product.price * amount,
      cartId: cartId.cartId
    });
    console.log(item);
    var products = cart.products;
    products.push(item);
    const document = Cart.updateOne(
      { _id: cartId.cartId },

      { products: products },
      async function(err, raw) {
        const chanchedProduct = await Cart.findById(cartId.cartId);

        if (err) {
          res.send(err);
        }
        res.send(chanchedProduct);
      }
    );

    res.status(200).json(cart);
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;
