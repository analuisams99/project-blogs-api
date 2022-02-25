const rescue = require('express-rescue');
const categoryService = require('../services/category');

const create = rescue(async (req, res) => {
  const { name } = req.body;

  const { code, category } = await categoryService.create({ name });

    const { id, categName } = category;

    return res.status(code).json({ id, name: categName });
});

const getAll = rescue(async (_req, res) => {
  const { code, categArray } = await categoryService.getAll();

  return res.status(code).json(categArray);
});

module.exports = {
  create,
  getAll,
};