const jwt = require('jsonwebtoken');
const Client = require('../models/client');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('Received Token:', token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
      console.log('Decoded Token:', decoded);

      const client = await Client.findById(decoded.id).select('-password');
      console.log('Found Client:', client);

      if (!client) {
        return res.status(404).json({ message: 'Client not found' });
      }

      req.client = client;
      next();
    } catch (err) {
      console.error('JWT Error:', err.message);
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  } else {
    return res.status(401).json({ message: 'No token provided' });
  }
};

module.exports = { protect };
