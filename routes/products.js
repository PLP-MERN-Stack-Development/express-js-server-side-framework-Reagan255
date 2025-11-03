const express = require('express');
const router = express.Router();
const validateProduct = require('../middleware/validateProduct'); 
const { NotFoundError } = require('../middleware/errors');

// Temporary data (simulating a database)
let products = [
  { id: 1, name: 'Phone', description: 'Smartphone', price: 699, category: 'Electronics', inStock: true },
  { id: 2, name: 'Book', description: 'Novel', price: 19, category: 'Books', inStock: true },
  { id: 3, name: 'Headphones', description: 'Wireless headphones', price: 199, category: 'Electronics', inStock: true },
  { id: 4, name: 'Keyboard', description: 'Mechanical keyboard', price: 89, category: 'Electronics', inStock: false },
  { id: 5, name: 'Notebook', description: 'Writing pad', price: 9, category: 'Books', inStock: true }
];

// 🧠 GET /api/products (Filter, Search, Pagination)
router.get('/', (req, res) => {
  let { category, search, page = 1, limit = 10 } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);

  let filtered = [...products];

  if (category) {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }

  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  res.json({
    total: filtered.length,
    page,
    limit,
    results: paginated
  });
});

// GET /api/products/:id
router.get('/:id', (req, res, next) => {
  try {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) throw new NotFoundError('Product not found');
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// POST /api/products
router.post('/', validateProduct, (req, res, next) => {
  try {
    const newProduct = {
      id: Date.now(),
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      inStock: req.body.inStock,
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:id
router.put('/:id', validateProduct, (req, res, next) => {
  try {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) throw new NotFoundError('Product not found');
    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/products/:id
router.delete('/:id', (req, res, next) => {
  try {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) throw new NotFoundError('Product not found');
    const deleted = products.splice(index, 1);
    res.json({ message: 'Deleted successfully', deleted });
  } catch (err) {
    next(err);
  }
});

// 📊 GET /api/products/stats
router.get('/stats', (req, res) => {
  const stats = products.reduce((acc, product) => {
    const cat = product.category;
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  res.json({
    totalProducts: products.length,
    countByCategory: stats
  });
});

module.exports = router;
