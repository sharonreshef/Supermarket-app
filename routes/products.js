var express = require('express');
var router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', async function(req, res, next) {
  const products = await Product.find().exec();
  res.send(products);
});

router.get('/:id', async function(req, res, next) {
  const { id } = req.params;
  try {
    const product = await Product.findById(id).exec();
    res.send(product);
  } catch (e) {
    res.status(404).send('not found');
  }
});

router.post('/', [auth, admin], async (req, res) => {
  const { name, price, categoryName, image } = req.body;
  const product = new Product({
    name,
    price,
    categoryName,
    image
  });
  try {
    const document = await product.save();
    res.status(200).json(document);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.put('/:id', [auth, admin], async (req, res) => {
  const { id } = req.params;
  const { name, price, categoryName, image } = req.body;
  const changedProduct = {
    name,
    price,
    categoryName,
    image
  };
  try {
    const document = Product.update(
      { _id: req.params.id },

      changedProduct,
      async function(err, raw) {
        const chanchedProduct = await Product.findById(id);
        if (err) {
          res.send(err);
        }
        res.send(chanchedProduct);
      }
    );
  } catch (e) {
    res.status(400).json(e);
  }
});
module.exports = router;
