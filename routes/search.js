var express = require('express');
var router = express.Router();
const Product = require('../models/Product');

router.get('/', async function(req, res, next) {
  const { categoryName } = req.query;
  try {
    console.log(categoryName);
    const products = await Product.find({ categoryName: categoryName }).exec();
    res.send(products);
  } catch (e) {
    res.status(404).send('not found');
  }
});

module.exports = router;
