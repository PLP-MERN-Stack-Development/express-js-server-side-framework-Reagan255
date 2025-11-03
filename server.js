const express = require('express');
const logger = require('./middleware/logger');      // Custom logger middleware
const auth = require('./middleware/auth');          // Authentication middleware
const productRoutes = require('./routes/products'); // Product routes
const errorHandler = require('./middleware/errorHandler'); // 👈 Global error handler

const app = express();
const PORT = 3000;

// 🧩 Global Middleware
app.use(express.json());  // Parse JSON request bodies
app.use(logger);          // Log every request (method, URL, time)

// 🧩 Protected Routes (require API key)
app.use('/api/products', auth, productRoutes);

// 🧩 Public Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 🧩 Catch-All Route for Unknown Paths
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
  });
});

// 🧩 Global Error Handler (must be last)
app.use(errorHandler);

// 🧩 Start the Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
