const Admin = require('../models/admin');
const Client = require('../models/client'); 
const jwt = require('jsonwebtoken');
const message = require('../helpers/message');

const generateToken = (admin) => {
  return jwt.sign(
    { id: admin._id, email: admin.email },
    process.env.JWT_SECRET || 'secretkey',
    { expiresIn: '2d' }
  );
};

// GET all clients (by admin)
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().select('-password');
    return message.success(res, 'All clients fetched', clients);
  } catch (err) {
    return message.error(res, err);
  }
};

// REGISTER
exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await Admin.findOne({ email });
    if (exists) return message.badRequest(res, 'Email already used');

    const admin = await Admin.create({ name, email, password });

    return message.created(res, 'Admin registered successfully', {
      token: generateToken(admin),
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      }
    });
  } catch (err) {
    return message.error(res, err);
  }
};

// LOGIN
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return message.badRequest(res, 'Invalid credentials');

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return message.badRequest(res, 'Invalid credentials');

    return message.success(res, 'Login successful', {
      token: generateToken(admin),
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      }
    });
  } catch (err) {
    return message.error(res, err);
  }
};

// GET profile /me
exports.getMe = async (req, res) => {
  try {
    const admin = req.admin;
    return message.success(res, 'Admin profile fetched', {
      id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } catch (err) {
    return message.error(res, err);
  }
};

// PUT /me (update profile)
exports.updateMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);
    if (!admin) return message.notFound(res, 'Admin not found');

    const { name, email, password } = req.body;

    if (name) admin.name = name;
    if (email) admin.email = email;
    if (password) admin.password = password;

    await admin.save();

    return message.success(res, 'Admin profile updated successfully', {
      id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } catch (err) {
    return message.error(res, err);
  }
};
