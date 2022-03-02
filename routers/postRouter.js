const express = require('express');
const { create, getAll, getById, update } = require('../controllers/post');
const { validateBlogPost, validatePostUpdate } = require('../middlewares/blogPostValidation');
const { validateToken } = require('../middlewares/tokenValidation');

const router = express.Router();

router
  .post('/', validateToken, validateBlogPost, create)
  .put('/:id', validateToken, validatePostUpdate, update)
  .get('/:id', validateToken, getById)
  .get('/', validateToken, getAll);

module.exports = router;