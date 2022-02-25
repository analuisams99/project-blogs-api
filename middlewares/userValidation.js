const { validateName } = require('../schemas/userSchema');

const validateUser = async (req, res, next) => {
  const { displayName } = req.body;
  
  const response = await validateName(displayName);

  if (response) {
    const { code, message } = response;

    return res.status(code).json({ message }); 
  }

  next();
};

module.exports = {
  validateUser,
};