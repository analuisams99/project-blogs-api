const { User, Post, Category, PostCategory } = require('../models');
const { postDoesNotExist, unauthorized } = require('../utils/errors');
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

const update = async ({ title, content }, id, token) => {
  const { data } = verifyToken(token); 
  const user = await User.findOne({ where: { email: data } });

  const postUser = await Post.findByPk(id);

  if (user.id !== postUser.userId) {
    const { code, message } = unauthorized;
    return { code, message };  
  }

  await Post.update({ title, content }, { where: { id } });
  const updatedPost = await Post.findOne({
    where: { id },
    include: [
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  
  return {
    code: 200,
    posts: updatedPost,
  };
};

const remove = async (id, token) => {
  const { data } = verifyToken(token); 

  const user = await User.findOne({ where: { email: data } });
  const postUser = await Post.findOne({ where: { id } });

  if (!postUser) {
    const { code, message } = postDoesNotExist;
    return { code, message };
  }
  
  if (user.id !== postUser.dataValues.userId) {
    const { code, message } = unauthorized;
    return { code, message };  
  }

  await Post.destroy({ where: { id } });

  return {
    code: 204,
  };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
