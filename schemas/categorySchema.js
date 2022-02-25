const { nameIsRequired } = require('../utils/errors');

const categoryValidation = ({ name }) => {
  if (!name) {
    const { code, message } = nameIsRequired;
    return { code, message };
  } 
  return null;
};

module.exports = {
  categoryValidation,
};