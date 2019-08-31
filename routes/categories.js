var express = require('express');
var router = express.Router();
const Category = require('../models/Category');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const categories = await Category.find();

  res.json(categories);
});

module.exports = router;
