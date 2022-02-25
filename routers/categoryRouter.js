const express = require('express');
const { create } = require('../controllers/category');
const { validateCategory } = require('../middlewares/categoryValidation');
const { validateToken } = require('../middlewares/tokenValidation');

const router = express.Router();

router
  .post('/', validateToken, validateCategory, create);

module.exports = router;