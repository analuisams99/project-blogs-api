const { validateTokenSchema } = require('../schemas/tokenSchema');

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  const response = await validateTokenSchema(token);

  if (response) {
    const { code, message } = response;
    return res.status(code).json({ message });
  }
  next();
};

module.exports = {
  validateToken,
};