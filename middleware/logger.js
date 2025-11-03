// middleware/logger.js
function logger(req, res, next) {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.url}`);
  next(); // move to next middleware or route
}

module.exports = logger;
