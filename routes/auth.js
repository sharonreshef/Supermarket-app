const express = require('express');
const router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Customer = require('../models/Customer');

router.get('/', auth, async (req, res) => {
  try {
    const customer = await Customer.findOne({
      customerID: req.customer.id
    }).select('-password');
    res.json(customer);
  } catch (err) {
    res.status(500).send('server error');
  }
});

// Authenticate user and get token
router.post(
  '/',
  [
    check('email', 'please include a valid email').isEmail(),
    check('password', 'Password is requierd').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let customer = await Customer.findOne({ email });

      if (!customer) {
        return res.status(400).send('Invalid Credentials');
      } else {
        const payload = {
          email: customer.email,
          customerID: customer.customerID,
          isAdmin: customer.isAdmin,
          orders: customer.orders
        };

        const isMatch = await bcrypt.compare(password, customer.password);

        if (!isMatch) {
          return res.status(400).send('Invalid Credentials');
        }

        jwt.sign(
          payload,
          config.get('jwtSecret'),
          {
            expiresIn: 3600
          },
          (err, token) => {
            if (err) throw err;
            res.json({ token, payload });
          }
        );
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
