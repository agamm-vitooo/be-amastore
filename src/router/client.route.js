const express = require('express');
const router = express.Router();
const { registerClient,loginClient, getMe, updateMe } = require('../controllers/client.controller');
const { getAllClients } = require('../controllers/admin.controller')
const { protect } = require('../middleware/client');
const { protectAdmin } = require('../middleware/admin');

router.get('/', protectAdmin, getAllClients);
router.post('/register', registerClient);
router.post('/login', loginClient);
router.get('/me', protect, getMe);
router.put('/me', protect, updateMe);

module.exports = router;
