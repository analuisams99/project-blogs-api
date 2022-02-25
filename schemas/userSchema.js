const { nameInvalid } = require('../utils/errors');

const validateName = (name) => {
  if (name.length < 8) {
    const { code, message } = nameInvalid;
    return { code, message };
  } 
  return null;
};

module.exports = {
  validateName,
};