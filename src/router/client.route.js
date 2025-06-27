const express = require('express');
const router = express.Router();

const {
  getClientById,
  registerClient,
  loginClient,
  getMe,
  updateMe,
  updateClientById,
  deleteClientById
} = require('../controllers/client.controller');

const { getAllClients } = require('../controllers/admin.controller');

const { protect } = require('../middleware/client');
const { protectAdmin } = require('../middleware/admin');

// 🔐 Admin-only routes
router.get('/', protectAdmin, getAllClients);
router.put('/:id', protectAdmin, updateClientById);     // ✅ Admin update client by ID
router.delete('/:id', protectAdmin, deleteClientById);  // ✅ Admin delete client by ID
router.get('/:id', protectAdmin, getClientById);

// 👤 Public / client-authenticated routes
router.post('/register', registerClient);
router.post('/login', loginClient);
router.get('/me', protect, getMe);
router.put('/me', protect, updateMe);

module.exports = router;
