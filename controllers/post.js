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

const getAll = rescue(async (_req, res) => {
  const allPosts = await postService.getAll();
  
  if (allPosts) {
    const { code, posts } = allPosts;
    return res.status(code).json([...posts]);
  }
});

module.exports = {
  create,
  getAll,
};