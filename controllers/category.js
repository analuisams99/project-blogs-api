const rescue = require('express-rescue');
const categoryService = require('../services/category');

const create = rescue(async (req, res) => {
  const { name } = req.body;

  const { code, category } = await categoryService.create({ name });

    const { id, categName } = category;

    return res.status(code).json({ id, name: categName });
});

module.exports = {
  create,
};