const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
}, {
  timestamps: true // otomatis handle createdAt dan updatedAt
});

module.exports = mongoose.model('Category', categorySchema);
