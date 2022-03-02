const { User, Post } = require('../models');
const { registeredUser } = require('../utils/errors');
const { createToken, verifyToken } = require('../utils/generateToken');

const create = async ({ displayName, email, password, image }) => {
  const alreadyExist = await User.findOne({ where: { email } });

  if (alreadyExist) {
    const { code, message } = registeredUser;
    return { code, message };
  }

  await User.create({ displayName, email, password, image });

  const token = createToken(email);

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

const remove = async (token) => {
  const { data } = verifyToken(token); 
  const user = await User.findOne({ where: { email: data } });

  await Post.destroy({ where: { id: user.id } });
  return { 
    code: 204,
  };
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
};