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

const getAll = async () => {
  const users = await User.findAll();
  
  return {
    code: 200,
    usersArray: {
      ...users,
    },
  };
};

const getById = async ({ id }) => {
  const user = await User.findByPk(id);

  return {
    code: 200,
    user,
  };
};

module.exports = {
  create,
  getAll,
  getById,
};