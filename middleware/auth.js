// middleware/auth.js
function auth(req, res, next) {
  const apiKey = req.headers['x-api-key'];

  if (apiKey === 'mysecretkey123') {
    next(); // proceed
  } else {
    res.status(401).json({ message: 'Unauthorized: Missing or invalid API key' });
  }
}

module.exports = auth;
