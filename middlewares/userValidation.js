const { userValidation, loginValidation } = require('../schemas/userSchema');

const validateUser = async (req, res, next) => {
  const { displayName, email, password } = req.body;
  const response = await userValidation({ displayName, email, password });

  if (response) {
    const { code, message } = response;

    return res.status(code).json({ message }); 
  }

  next();
};

const validatelogin = async (req, res, next) => {
  const { email, password } = req.body;
  const response = await loginValidation({ email, password });

  if (response) {
    const { code, message } = response;

    return res.status(code).json({ message }); 
  }

  next();
};

module.exports = {
  validateUser,
  validatelogin,
};