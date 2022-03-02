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

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const { code, post, message } = await postService.getById(id);

  if (message) {
    return res.status(code).json({ message });
  }
  return res.status(code).json(post);
});

const update = rescue(async (req, res) => {
  const token = req.headers.authorization;
  const { id } = req.params;
  const { title, content } = req.body;

  const { code, message, posts } = await postService.update({ title, content }, id, token);

  if (message) {
    return res.status(code).json({ message });
  }

  return res.status(code).json(posts);
});

const remove = rescue(async (req, res) => {
  const token = req.headers.authorization;
  const { id } = req.params;

  const { code, message } = await postService.remove(id, token);

  if (message) {
    return res.status(code).json({ message });
  }

  return res.status(code).end();
});

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};