var express = require('express');
var router = express.Router();
const Category = require('../models/Category');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const categories = await Category.find().exec();

  res.send(categories);
});

module.exports = router;
