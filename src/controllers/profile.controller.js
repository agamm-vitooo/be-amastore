const Profile = require('../models/profile');
const message = require('../helpers/message');

// GET /api/site-profile
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) return message.notFound(res, 'Site profile not found');

    return message.success(res, 'Site profile fetched successfully', profile);
  } catch (err) {
    return message.error(res, err);
  }
};

// POST /api/site-profile
exports.createProfile = async (req, res) => {
  try {
    const exists = await Profile.findOne();
    if (exists) return message.badRequest(res, 'Site profile already exists');

    const profile = await Profile.create(req.body);
    return message.created(res, 'Site profile created successfully', profile);
  } catch (err) {
    return message.error(res, err);
  }
};

// PUT /api/site-profile/:id
exports.updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!profile) return message.notFound(res, 'Site profile not found');

    return message.success(res, 'Site profile updated successfully', profile);
  } catch (err) {
    return message.error(res, err);
  }
};

// DELETE /api/site-profile/:id
exports.deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);
    if (!profile) return message.notFound(res, 'Site profile not found');

    return message.success(res, 'Site profile deleted successfully');
  } catch (err) {
    return message.error(res, err);
  }
};
