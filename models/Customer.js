const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  customerID: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    }
  ]
});

// module.exports = Customer = mongoose.model('customer', CustomerSchema);
const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;
