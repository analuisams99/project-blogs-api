const { User, Post, Category, PostCategory } = require('../models');
const { postDoesNotExist } = require('../utils/errors');
const { verifyToken } = require('../utils/generateToken');

const create = async (title, content, categoryIds, token) => {
  const { data } = verifyToken(token);
  const user = await User.findOne({ where: { email: data } });

  const { dataValues } = await Post.create({ title, content, userId: user.id });

  categoryIds.forEach(async (id) => {
    await PostCategory.create({ postId: dataValues.id, categoryId: id });
  });

  return {
    code: 201,
    post: { id: dataValues.id, userId: user.id, title, content },
  };
};

const getAll = async () => {
  const allPosts = await Post.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { exclude: [] } },
    ],
  });

  return {
    code: 200,
    posts: allPosts,
  };
};

const getById = async (id) => {
  const post = await Post.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) {
    const { code, message } = postDoesNotExist;
    return { code, message };
  }

  return {
    code: 200,
    post,
  };
};

module.exports = {
  create,
  getAll,
  getById,
};
