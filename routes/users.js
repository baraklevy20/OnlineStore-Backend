const express = require('express');
const Joi = require('@hapi/joi');
const router = express.Router();

router.post('/', function (req, res, next) {
  const userData = req.body;

  // Validate first
  const userSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    address: Joi.string().required()
  });
  Joi.assert(userData, userSchema);

  // Save in session
  req.session.userData = userData;

  // Send the user data to client (in the future, it might store additional information)
  res.send(req.session.userData);
});

module.exports = router;
