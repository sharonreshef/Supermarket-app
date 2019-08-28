var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');

var indexRouter = require('./routes/index');
var customersRouter = require('./routes/customers');
var authRouter = require('./routes/auth');

// var productsRouter = require('./routes/products');

var app = express();
app.use(cors());

//connect to DB
connectDB();

app.use(logger('dev'));
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/customers', customersRouter);
app.use('/auth', authRouter);

// app.use('/products', productsRouter);

module.exports = app;
