const { categoryValidation } = require('../schemas/categorySchema');

const validateCategory = async (req, res, next) => {
  const { name } = req.body;
  const response = await categoryValidation({ name });

  if (response) {
    const { code, message } = response;

    return res.status(code).json({ message }); 
  }

  next();
};

module.exports = {
  validateCategory,
};