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
  const { quantity } = req.body;

  try {
    const cart = await Cart.findById(cartId.cartId).exec();
    const product = await Product.findById(productId).exec();

    const item = new Item({
      productId: product.id,
      name: product.name,
      quantity: quantity,
      image: product.image,
      price: product.price * quantity,
      cartId: cartId.cartId
    });
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
  } catch (e) {
    res.status(400).json(e);
  }
});

//Change product quantity
router.put('/:cartId', [auth], async (req, res) => {
  const { cartId } = req.params;
  const { quantity, productId } = req.body;
  try {
    const cart = await Cart.findOneAndUpdate(
      {
        _id: cartId,
        'products.productId': productId
      },
      {
        $set: {
          'products.$.quantity': quantity
        }
      },
      async function(err, raw) {
        const changedCart = await Cart.findById(cartId);
        if (err) {
          res.send(err);
        }
        res.send(changedCart);
      }
    );
  } catch (e) {
    res.status(400).json(e);
  }
});

// delete item from cart
router.delete('/:cartId/delete/:productId', auth, async (req, res) => {
  const cartId = req.params.cartId;
  const productId = req.params.productId;

  try {
    Cart.updateOne(
      { _id: cartId },
      { $pull: { products: { productId: productId } } },
      { safe: true, multi: true },
      async function(err, obj) {
        const changedCart = await Cart.findById(cartId);
        if (err) {
          res.send(err);
        }
        res.send(changedCart);
      }
    );
  } catch (e) {
    res.status(400).json(e);
  }
});

//delete all cart

module.exports = router;
