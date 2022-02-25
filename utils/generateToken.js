require('dotenv/config');
const JWT = require('jsonwebtoken');
const { tokenInvalid } = require('./errors');

const { JWT_SECRET } = process.env;

const tokenConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (data) => {
  const token = JWT.sign({ data }, JWT_SECRET, tokenConfig);
  
  return token;
};

const verifyToken = (token) => {
  try {
    const { data } = JWT.decode(token, JWT_SECRET);
    return { error: null, data };
  } catch (err) {
    return { error: tokenInvalid.message };
  }
};

module.exports = {
  createToken,
  verifyToken,
};