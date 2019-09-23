const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const payload = jwt.verify(token, config.get('jwtSecret'));

    req.customer = payload;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
