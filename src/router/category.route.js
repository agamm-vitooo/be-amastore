const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

// GET /api/categories
router.get('/', categoryController.getAllCategories);

// POST /api/categories
router.post('/', categoryController.createCategory);

module.exports = router;
