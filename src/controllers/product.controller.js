const Product = require('../models/product');
const slugify = require('slugify');
const message = require('../helpers/message');

// GET all products with pagination
exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments();
    const products = await Product.find()
      .populate('category_id', 'name slug')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return message.success(res, 'Product list fetched successfully', {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: products
    });
  } catch (err) {
    return message.error(res, err);
  }
};

// CREATE new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, image_url, category_id, is_active } = req.body;
    const slug = slugify(name, { lower: true });

    const product = new Product({
      name,
      slug,
      description,
      image_url,
      category_id,
      is_active
    });

    await product.save();
    return message.created(res, 'Product created successfully', product);
  } catch (err) {
    return message.error(res, err);
  }
};

// UPDATE product by ID
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, image_url, category_id, is_active } = req.body;
    const slug = name ? slugify(name, { lower: true }) : undefined;

    const updatedData = {
      ...(name && { name }),
      ...(slug && { slug }),
      ...(description && { description }),
      ...(image_url && { image_url }),
      ...(category_id && { category_id }),
      ...(typeof is_active === 'boolean' && { is_active }),
    };

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!product) return message.notFound(res, 'Product not found');

    return message.success(res, 'Product updated successfully', product);
  } catch (err) {
    return message.error(res, err);
  }
};

// DELETE product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return message.notFound(res, 'Product not found');

    return message.success(res, 'Product deleted successfully');
  } catch (err) {
    return message.error(res, err);
  }
};
