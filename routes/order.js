var express = require('express');
var router = express.Router();
var Item = require('../models/Item');
var auth = require('../middleware/auth');
var Order = require('../models/Order');

// create order
router.post('/', auth, async (req, res) => {
  const customerID = req.customer.customerID;
  const products = req.body.products;
  const order = new Order({
    creator: customerID,
    products
  });
  try {
    const document = await order.save();
    res.status(200).json(document);
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;
