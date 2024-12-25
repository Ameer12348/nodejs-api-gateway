// Error-handling middleware
const errorHandler = (err, req, res, next) => {
  // Check if it's a Joi validation error
  if (err.isJoi) {
    return res.status(400).json({
      error: err.details.map((detail) => detail.message),
    });
  }

  // Handle other errors
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
