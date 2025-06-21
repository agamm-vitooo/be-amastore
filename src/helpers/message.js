// helpers/message.js

module.exports = {
  // 200 OK
  success: (res, message = 'Success', data = null) => {
    return res.status(200).json({
      success: true,
      message,
      data,
    });
  },

  // 201 Created
  created: (res, message = 'Created successfully', data = null) => {
    return res.status(201).json({
      success: true,
      message,
      data,
    });
  },

  // 400 Bad Request
  badRequest: (res, message = 'Bad request') => {
    return res.status(400).json({
      success: false,
      message,
    });
  },

  // 404 Not Found
  notFound: (res, message = 'Not found') => {
    return res.status(404).json({
      success: false,
      message,
    });
  },

  // 422 Unprocessable Entity (Validation)
  validationError: (res, errors) => {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  },

  // 500 Internal Server Error
  error: (res, err) => {
    return res.status(500).json({
      success: false,
      message: err.message || 'Server error',
    });
  },
};
