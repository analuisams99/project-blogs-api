const express = require('express');
const { login } = require('../controllers/login');
const { validatelogin } = require('../middlewares/userValidation');

const router = express.Router();

router
  .post('/', validatelogin, login);

module.exports = router;