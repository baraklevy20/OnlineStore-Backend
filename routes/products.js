const express = require('express');
const router = express.Router();
const getProducts = require('../controllers/products')

router.get('/', function (req, res, next) {
  pageNumber = parseInt(req.query.pageNumber);
  pageSize = parseInt(req.query.pageSize);

  getProducts().then(products => {
    res.send({
      products: products.slice(Math.max(0, pageNumber * pageSize),
        Math.min(products.length, (pageNumber + 1) * pageSize)),
      numberOfProducts: products.length
    });
  })
});

module.exports = router;
