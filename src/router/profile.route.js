const express = require('express');
const router = express.Router();
const {getProfile, createProfile, updateProfile, deleteProfile } = require('../controllers/profile.controller');

const { protectAdmin } = require('../middleware/admin');

router.get('/', getProfile);
router.post('/', protectAdmin, createProfile);
router.put('/:id', protectAdmin, updateProfile);
router.delete('/:id', protectAdmin, deleteProfile);

module.exports = router;
