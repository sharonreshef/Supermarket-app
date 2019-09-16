const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Customer = require('../models/Customer');

//@route POST /customers
router.post(
  '/',
  [
    check('firstName', 'First Name is required')
      .not()
      .isEmpty(),
    check('lastName', 'Last Name is required')
      .not()
      .isEmpty(),
    check('email', 'please include a valid email').isEmail(),
    check('customerID', 'please enter a valid id').isLength({ min: 9 }),
    check(
      'password',
      'please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('city', 'City is required')
      .not()
      .isEmpty(),
    check('street', 'street is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      firstName,
      lastName,
      email,
      customerID,
      password,
      city,
      street
    } = req.body;
    const isAdmin = false;

    try {
      let customer = await Customer.findOne({ customerID });

      if (customer) {
        return res.status(400).send('Customer already exists');
      } else {
        customer = new Customer({
          firstName,
          lastName,
          email,
          customerID,
          password,
          city,
          street,
          isAdmin
        });

        const salt = await bcrypt.genSalt(10);

        customer.password = await bcrypt.hash(password, salt);

        await customer.save();

        const payload = {
          email: customer.email,
          username: customer.firstName,
          customerID: customer.customerID,
          isAdmin: customer.isAdmin,
          orders: customer.orders
        };

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

router.post('/checkID', async (req, res) => {
  const { customerID } = req.body;

  try {
    let customer = await Customer.findOne({ customerID });

    if (customer) {
      return res.status(400).send('Customer already exists');
    } else {
      res.json(true);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
