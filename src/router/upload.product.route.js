const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.product');
const { uploadProduct } = require('../controllers/upload.product.controller');

router.post('/product', upload.single('image'), uploadProduct);

module.exports = router;