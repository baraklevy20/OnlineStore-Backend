const express = require('express');
const router = express.Router();
const handleRequest = require('../controllers/purchases')
const getProducts = require('../controllers/products')

router.post('/', function (req, res, next) {
  handleRequest(req, res);
});

router.get('/', function (req, res, next) {
  products = getProducts().then(products => {
    purchases = [];
    
    // Go through each purchase
    for (const key in req.session.purchases) {
      if (req.session.purchases.hasOwnProperty(key)) {
        // Add the product to the purchase with the number of units the user bought
        purchases.push({...products[key], unitsBought: req.session.purchases[key]});
      }
    }
    res.send(purchases);
  })
});

module.exports = router;
