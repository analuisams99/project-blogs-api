require('dotenv/config');
const JWT = require('jsonwebtoken');

const createToken = (data) => {
  const tokenConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const { JWT_SECRET } = process.env;

  const token = JWT.sign({ data }, JWT_SECRET, tokenConfig);
  
  return token;
};

module.exports = {
  createToken,
};