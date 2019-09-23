var express = require('express');
var router = express.Router();
var Cart = require('../models/Cart');
var Product = require('../models/Product');
var Item = require('../models/Item');
var auth = require('../middleware/auth');

// get user cart
router.get('/', auth, async function(req, res, next) {
  const customerID = req.customer.customerID;
  const cart = await Cart.findOne({ customerID: customerID }).exec();

  res.send(cart);
});

// create cart
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

// add item to cart
router.post('/:cartId', auth, async (req, res) => {
  const cartId = req.params;
  const { productId } = req.body;
  const { amount } = req.body;

  try {
    const cart = await Cart.findById(cartId.cartId).exec();
    const product = await Product.findById(productId).exec();
    // const price = product.price * amount;

    const item = new Item({
      productId: product.id,
      amount: amount,
      price: product.price * amount,
      cartId: cartId.cartId
    });
    // console.log(item);
    var products = cart.products;
    products.push(item);
    const document = Cart.updateOne(
      { _id: cartId.cartId },

      { products: products },
      async function(err, raw) {
        const newCart = await Cart.findById(cartId.cartId);

        if (err) {
          res.send(err);
        }
        res.send(newCart);
      }
    );

    // res.status(200).json(cart);
  } catch (e) {
    res.status(400).json(e);
  }
});

// delete item from cart
router.delete('/:cartId/delete', auth, async (req, res) => {
  const cartId = req.params;
  const { productId } = req.body;

  try {
    const cart = await Cart.findById(cartId.cartId).exec();
    index = cart.products.indexOf(productId);
    var products = cart.products;
    cart.products.splice(index, 1);
    const document = Cart.updateOne(
      { _id: cartId.cartId },

      { products: products },
      async function(err, raw) {
        const newCart = await Cart.findById(cartId.cartId);

        if (err) {
          res.send(err);
        }
        res.send(newCart);
      }
    );

    // res.status(200).json(cart);
  } catch (e) {
    res.status(400).json(e);
  }
});

//delete all cart

module.exports = router;
