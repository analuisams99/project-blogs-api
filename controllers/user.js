const rescue = require('express-rescue');
const userService = require('../services/user');

const create = rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const { code, message, token } = await userService.create(
    { displayName, email, password, image },
  );

  if (message) {
    return res.status(code).json({ message });
  }
  return res.status(code).json({ token });
});

const getAll = rescue(async (_req, res) => {
  const { code, usersArray } = await userService.getAll();

  return res.status(code).json(usersArray);
});

module.exports = {
  create,
  getAll,
};