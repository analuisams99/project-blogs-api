const rescue = require('express-rescue');
const { verifyLogin } = require('../services/login');

const login = rescue(async (req, res) => {
  const { email, password } = req.body;

  const { code, message, token } = await verifyLogin(
    { email, password },
  );
  
  if (message) {
    return res.status(code).json({ message });
  }
  return res.status(code).json({ token });
});

module.exports = {
  login,
};