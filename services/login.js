const { User } = require('../models');
const { loginError } = require('../utils/errors');
const { createToken } = require('../utils/generateToken');

const verifyLogin = async ({ email, password }) => {
  const userExist = await User.findOne({ where: { email, password } });

  if (!userExist) {
    const { code, message } = loginError;
    return { code, message };
  }

  const token = createToken(email);

  return {
    code: 200,
    token,
  };
};

module.exports = {
  verifyLogin,
};