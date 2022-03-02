const { Category } = require('../models');

const { titleIsRequired, contentIsRequired, 
  categoryIdsIsRequired, categoryIdsNotFound } = require('../utils/errors');

const validateCategoryIds = async (categoryIds) => {
  const categoryExists = await Category.findAll({ where: { id: categoryIds } });

  if (categoryExists.length !== categoryIds.length) {
    const { code, message } = categoryIdsNotFound;
    return { code, message }; 
  }
};
const blogPostValidation = async ({ title, content, categoryIds }) => {
  if (!title) {
    const { code, message } = titleIsRequired;
    return { code, message };
  }
  if (!content) {
    const { code, message } = contentIsRequired;
    return { code, message };
  }
  if (!categoryIds) {
    const { code, message } = categoryIdsIsRequired;
    return { code, message };
  }
  const validateCategoryId = await validateCategoryIds(categoryIds);
  if (validateCategoryId) return validateCategoryId;

  return null;
};

module.exports = {
  blogPostValidation,
};