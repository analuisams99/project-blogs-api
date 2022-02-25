const { tokenNotFound, tokenInvalid } = require('../utils/errors');
const { verifyToken } = require('../utils/generateToken');

const validateTokenSchema = async (token) => {
  if (!token || token === '') {
    const { code, message } = tokenNotFound;
    return { code, message };
  }

  const response = verifyToken(token);
  if (response.error !== null) {
    const { code, message } = tokenInvalid;
    return { code, message };
  }
};

module.exports = {
  validateTokenSchema,
};