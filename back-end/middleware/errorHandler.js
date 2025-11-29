// Centralized error handling middleware
function errorHandler(err, req, res, next) {
  console.error(err.stack || err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
  });
}

module.exports = errorHandler;