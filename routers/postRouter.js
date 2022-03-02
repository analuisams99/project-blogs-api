const express = require('express');
const { create } = require('../controllers/post');
const { validateBlogPost } = require('../middlewares/blogPostValidation');
const { validateToken } = require('../middlewares/tokenValidation');

const router = express.Router();

router
  .post('/', validateToken, validateBlogPost, create);

module.exports = router;