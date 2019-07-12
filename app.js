const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const products = require('./routes/products')
const users = require('./routes/users')
const index = require('./routes/index')
app = express();

// Set the sessions
app.use(session({
  'secret': 'zoominfo',
  saveUninitialized: false,
  resave: true
}))

app.all('*', function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

// Configure routes
app.use(bodyParser.json());
app.use("/api/", index);
app.use("/api/users", users);
app.use("/api/products", products);
// app.use("/api/purchases", purchases);

module.exports = app;