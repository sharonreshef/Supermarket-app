const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
mongoose.connect(process.env.MONGODB_URI || db, { useNewUrlParser: true });
const connectDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true });
    console.log('mongoDB connect');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
