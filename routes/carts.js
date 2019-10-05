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
router.delete('/:cartId', auth, async (req, res) => {
  const cartId = req.params.cartId;

  try {
    // Cart.remove(
    //   { _id: cartId }
    //   //   , async function(err, obj) {
    //   //   const changedCart = await Cart.findById(cartId);
    //   //   if (err) {
    //   //     res.send(err);
    //   //   }
    //   //   res.send(changedCart);
    //   // }
    // );
    // res.send('cart cleared');

    Cart.findByIdAndRemove(cartId, (err, cart) => {
      // As always, handle any potential errors:
      if (err) return res.status(500).send(err);
      // We'll create a simple object to send back with a message and the id of the document that was removed
      // You can really do this however you want, though.
      const response = {
        message: 'cart successfully deleted'
      };
      return res.status(200).send(response);
    });
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;
