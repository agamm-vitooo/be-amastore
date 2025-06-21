const Category = require('../models/category');
const slugify = require('slugify');
const message = require('../helpers/message');

// GET all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    return message.success(res, 'Categories fetched successfully', categories);
  } catch (err) {
    return message.error(res, err);
  }
};

// CREATE new category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const slug = slugify(name, { lower: true });

    const existing = await Category.findOne({ slug });
    if (existing) return message.badRequest(res, 'Category already exists');

    const category = new Category({ name, slug });
    await category.save();

    return message.created(res, 'Category created successfully', category);
  } catch (err) {
    return message.error(res, err);
  }
};
