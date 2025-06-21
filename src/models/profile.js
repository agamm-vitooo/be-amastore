// models/siteProfile.js

const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: true
  },
  tagline: {
    type: String,
    default: ''
  },
  about_us: {
    type: String,
    default: ''
  },
  logo_url: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Profile', ProfileSchema);
