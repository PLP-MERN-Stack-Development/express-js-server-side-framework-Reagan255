// middleware/errorHandler.js

function errorHandler(err, req, res, next) {
  console.error('🔥 Error:', err.message);

  // Default values
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    status: 'error',
    message,
  });
}

module.exports = errorHandler;
