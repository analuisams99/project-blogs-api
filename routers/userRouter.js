const express = require('express');
const { create } = require('../controllers/user');
const { validateUser } = require('../middlewares/userValidation');

const router = express.Router();

router
  .post('/', validateUser, create);

module.exports = router;