const s3 = require('../utils/s3');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const message = require('../helpers/message');

exports.uploadAvatar = async (req, res) => {
  const file = req.file;
  if (!file) return message.badRequest(res, 'No file uploaded');

  const ext = path.extname(file.originalname);
  const fileName = `avatars/${uuidv4()}${ext}`;

  const params = {
    Bucket: process.env.B2_BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    await s3.upload(params).promise();
    const fileUrl = `${process.env.B2_ENDPOINT}/${process.env.B2_BUCKET_NAME}/${fileName}`;
    return message.success(res, 'Avatar uploaded successfully', { fileUrl });
  } catch (err) {
    console.error(err);
    return message.error(res, err);
  }
};
