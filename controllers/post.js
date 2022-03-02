const rescue = require('express-rescue');
const postService = require('../services/post');

const create = rescue(async (req, res) => {
  const token = req.headers.authorization;
  const { title, content, categoryIds } = req.body;

  const response = await postService.create(title, content, categoryIds, token);
  
  if (response) {
    const { code } = response;
    const { id, userId } = response.post;
    return res.status(code).json({ id, userId, title, content });
  }
});

module.exports = {
  create,
};