const Client = require('../models/client');
const jwt = require('jsonwebtoken');
const message = require('../helpers/message');

// Generate JWT
const generateToken = (client) => {
  return jwt.sign(
    { id: client._id, email: client.email },
    process.env.JWT_SECRET || 'secretkey',
    { expiresIn: '2d' }
  );
};

// Register
exports.registerClient = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const exists = await Client.findOne({ email });
    if (exists) return message.badRequest(res, 'Email already used');

    const client = await Client.create({ name, email, password, phone });

    return message.created(res, 'Client registered successfully', {
      token: generateToken(client),
      client: {
        id: client._id,
        name: client.name,
        email: client.email,
        phone: client.phone
      }
    });
  } catch (err) {
    return message.error(res, err);
  }
};

// Login
exports.loginClient = async (req, res) => {
  try {
    const { email, password } = req.body;

    const client = await Client.findOne({ email });
    if (!client) return message.badRequest(res, 'Invalid credentials');

    const isMatch = await client.comparePassword(password);
    if (!isMatch) return message.badRequest(res, 'Invalid credentials');

    return message.success(res, 'Login successful', {
      token: generateToken(client),
      client: {
        id: client._id,
        name: client.name,
        email: client.email,
        phone: client.phone
      }
    });
  } catch (err) {
    return message.error(res, err);
  }
};

// GET /api/clients/:id - Admin get client detail
exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return message.notFound(res, 'Client not found');
    return message.success(res, 'Client found', client);
  } catch (err) {
    return message.error(res, err);
  }
};

// GET /api/clients/me
exports.getMe = async (req, res) => {
  try {
    const client = req.client;
    return message.success(res, 'Client profile', {
      id: client._id,
      name: client.name,
      email: client.email,
      phone: client.phone
    });
  } catch (err) {
    return message.error(res, err);
  }
};

// PUT /api/clients/me
exports.updateMe = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const client = await Client.findByIdAndUpdate(
      req.client._id,
      { name, email, phone },
      { new: true }
    );

    return message.success(res, 'Client updated', {
      id: client._id,
      name: client.name,
      email: client.email,
      phone: client.phone
    });
  } catch (err) {
    return message.error(res, err);
  }
};

// PUT /api/clients/:id - Admin update client
exports.updateClientById = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const clientId = req.params.id;

    const client = await Client.findByIdAndUpdate(
      clientId,
      { name, email, phone },
      { new: true }
    );

    if (!client) return message.notFound(res, 'Client not found');

    return message.success(res, 'Client updated by admin', {
      id: client._id,
      name: client.name,
      email: client.email,
      phone: client.phone
    });
  } catch (err) {
    return message.error(res, err);
  }
};

// DELETE /api/clients/:id - Admin delete client
exports.deleteClientById = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return message.notFound(res, 'Client not found');

    return message.success(res, 'Client deleted successfully');
  } catch (err) {
    return message.error(res, err);
  }
};

