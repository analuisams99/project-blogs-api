const { Category } = require('../models');

const create = async ({ name }) => {
  const category = await Category.create({ name });

  const { id, name: categName } = category;

  return {
    code: 201,
    category: {
      id,
      categName,
    },
  };
};

module.exports = {
  create,
};