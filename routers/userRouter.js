const express = require('express');
const { create, getAll, getById } = require('../controllers/user');
const { validateUser, validateUserExist } = require('../middlewares/userValidation');

const { validateToken } = require('../middlewares/tokenValidation');

const router = express.Router();

router
  .post('/', validateUser, create)
  .get('/:id', validateToken, validateUserExist, getById)
  .get('/', validateToken, getAll);

module.exports = router;