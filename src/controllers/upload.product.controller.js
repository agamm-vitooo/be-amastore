const s3 = require('../utils/s3');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const message = require('../helpers/message');

exports.uploadProduct = async (req, res) => {
  const file = req.file;
  if (!file) return message.badRequest(res, 'No file uploaded');

  const ext = path.extname(file.originalname);
  const fileName = `products/${uuidv4()}${ext}`;

  console.log('🧪 Upload to bucket:', process.env.B2_BUCKET_NAME);
  console.log('🧪 Endpoint:', process.env.B2_ENDPOINT);

  const params = {
    Bucket: process.env.B2_BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    await s3.upload(params).promise();

    const signedUrl = s3.getSignedUrl('getObject', {
      Bucket: process.env.B2_BUCKET_NAME,
      Key: fileName,
      Expires: 60 * 60, // 1 jam
    });

    return message.success(res, 'Product image uploaded successfully', {
      fileUrl: signedUrl,
    });
  } catch (err) {
    console.error(err);
    return message.error(res, err);
  }
};
