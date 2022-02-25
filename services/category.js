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

const getAll = async () => {
  const categories = await Category.findAll();
  
  return {
    code: 200,
    categArray: {
      ...categories,
    },
  };
};

module.exports = {
  create,
  getAll,
};