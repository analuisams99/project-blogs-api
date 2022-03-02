const { User, Post, PostCategory } = require('../models');
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

module.exports = {
  create,
};
