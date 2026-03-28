     // backend/routes/products.js
     const express = require('express');
     const router = express.Router();
     const { getProducts } = require('../controllers/productController');

     router.get('/api/products', getProducts);

     module.exports = router;