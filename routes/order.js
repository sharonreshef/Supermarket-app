var express = require('express');
var router = express.Router();
var Item = require('../models/Item');
var auth = require('../middleware/auth');
var Order = require('../models/Order');

router.get('/', async (req, res) => {
  const orders = await Order.find().exec();
  res.status(200).json(orders.length);
});

// get user orders
router.get('/myorders', auth, async (req, res) => {
  const customerID = req.customer.customerID;

  Order.find({ creator: customerID }).then(orders => {
    res.status(200).json(orders);
  });
});

// create order
router.post('/', auth, async (req, res) => {
  const customerID = req.customer.customerID;

  const {
    products,
    totalPrice,
    city,
    street,
    shippingDate,
    last4CreditDigit
  } = req.body;

  const order = new Order({
    creator: customerID,
    products,
    totalPrice,
    city,
    street,
    shippingDate,
    last4CreditDigit
  });
  try {
    const document = await order.save();
    res.status(200).json(document);
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;
