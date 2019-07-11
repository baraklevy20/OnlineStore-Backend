var express = require('express'),
      app = express(),
      bodyParser = require('body-parser');
var products = require('./routes/products')
var index = require('./routes/index')

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(bodyParser.json());
app.use("/api/", index);
app.use("/api/products", products);

module.exports = app;