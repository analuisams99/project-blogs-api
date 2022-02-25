const express = require('express');
const { create, getAll } = require('../controllers/category');
const { validateCategory } = require('../middlewares/categoryValidation');
const { validateToken } = require('../middlewares/tokenValidation');

const router = express.Router();

router
  .post('/', validateToken, validateCategory, create)
  .get('/', validateToken, getAll);

module.exports = router;