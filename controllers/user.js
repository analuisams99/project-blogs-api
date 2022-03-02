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

const getById = rescue(async (req, res) => {
  const { id } = req.params;

  const { code, user } = await userService.getById({ id });

  return res.status(code).json(user);
});

const remove = rescue(async (req, res) => {
  const token = req.headers.authorization;
  const { code } = await userService.remove(token);
  return res.status(code).end();
});

module.exports = {
  create,
  getAll,
  getById,
  remove,
};