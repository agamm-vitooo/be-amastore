const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, getMe, updateMe, getAllClients } = require('../controllers/admin.controller');
const { protectAdmin } = require('../middleware/admin');

router.get('/clients', protectAdmin, getAllClients);
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/me', protectAdmin, getMe);
router.put('/me', protectAdmin, updateMe);

module.exports = router;
