const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log("Authorization header missing or malformed:", authHeader);
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    console.log("Received token:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded payload:", decoded);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    console.error("JWT verification error:", err.message);
    return res.status(400).json({ error: 'Invalid token' });
  }
};
