const express = require('express');
const { create, getAll } = require('../controllers/user');
const { validateUser } = require('../middlewares/userValidation');

const { validateToken } = require('../middlewares/tokenValidation');

const router = express.Router();

router
  .post('/', validateUser, create)
  .get('/', validateToken, getAll);

module.exports = router;