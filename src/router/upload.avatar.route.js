const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.avatar');
const { uploadAvatar } = require('../controllers/upload.avatar.controller');

router.post('/avatar', upload.single('image'), uploadAvatar);

module.exports = router;
