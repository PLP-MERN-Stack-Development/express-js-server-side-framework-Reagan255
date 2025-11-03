// middleware/errors.js

// Base Error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// 404 Not Found
class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

// 400 Bad Request / Validation Error
class ValidationError extends AppError {
  constructor(message = 'Invalid data') {
    super(message, 400);
  }
}

module.exports = { AppError, NotFoundError, ValidationError };
