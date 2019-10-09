const Customer = require('../models/Customer');

module.exports = async function(req, res, next) {
  const customer = await Customer.findOne({
    customerID: req.customer.customerID
  }).exec();

  try {
    if (customer.isAdmin === null) {
      return res.status(400).json({ errors: [{ msg: 'User is not Admin' }] });
    }
    next();
  } catch (err) {
    res.status(401).json({ msg: 'User is not Admin' });
  }
};
