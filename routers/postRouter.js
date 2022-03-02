const express = require('express');
const { create, getAll, getById } = require('../controllers/post');
const { validateBlogPost } = require('../middlewares/blogPostValidation');
const { validateToken } = require('../middlewares/tokenValidation');

const router = express.Router();

router
  .post('/', validateToken, validateBlogPost, create)
  .get('/:id', validateToken, getById)
  .get('/', validateToken, getAll);

module.exports = router;