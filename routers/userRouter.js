const express = require('express');
const { create, getAll, getById, remove } = require('../controllers/user');
const { validateUser, validateUserExist } = require('../middlewares/userValidation');

const { validateToken } = require('../middlewares/tokenValidation');

const router = express.Router();

router
  .post('/', validateUser, create)
  .get('/:id', validateToken, validateUserExist, getById)
  .get('/', validateToken, getAll)
  .delete('/me', validateToken, remove);

module.exports = router;