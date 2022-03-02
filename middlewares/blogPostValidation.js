const { blogPostValidation } = require('../schemas/blogPostSchema');

const validateBlogPost = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const response = await blogPostValidation({ title, content, categoryIds });

  if (response) {
    const { code, message } = response;

    return res.status(code).json({ message }); 
  }

  next();
};

module.exports = {
  validateBlogPost,
};