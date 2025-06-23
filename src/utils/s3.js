const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  endpoint: new AWS.Endpoint(process.env.B2_ENDPOINT), // Pakai objek Endpoint!
  accessKeyId: process.env.B2_KEY_ID,
  secretAccessKey: process.env.B2_APP_KEY,
  region: 'us-east-005', // HARUS cocok dengan Backblaze B2 region
  signatureVersion: 'v4',
});

module.exports = s3;
