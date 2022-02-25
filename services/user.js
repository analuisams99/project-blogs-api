const { User } = require('../models');
const { registeredUser } = require('../utils/errors');
const { createToken } = require('../utils/generateToken');

const create = async ({ displayName, email, password, image }) => {
  const alreadyExist = await User.findOne({ where: { email } });

  if (alreadyExist) {
    const { code, message } = registeredUser;
    return { code, message };
  }

  await User.create({ displayName, email, password, image });

  const token = createToken(password);

  return {
    code: 201,
    token,
  };
};

module.exports = {
  create,
};