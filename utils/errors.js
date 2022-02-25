// const CREATED = 201;
const BAD_REQUEST = 400;
// const UNAUTHORIZED = 401;
const CONFLICT = 409;
// const INTERNAL_SERVER_ERROR = 500;

module.exports = {
  nameInvalid: {
    code: BAD_REQUEST,
    message: '"displayName" length must be at least 8 characters long',
  },
  emailInvalid: {
    code: BAD_REQUEST,
    message: '"email" must be a valid email',
  },
  emptyEmail: {
    code: BAD_REQUEST,
    message: '"email" is not allowed to be empty',
  },
  requiredEmail: {
    code: BAD_REQUEST,
    message: '"email" is required',
  },
  emptyPassword: {
    code: BAD_REQUEST,
    message: '"password" is not allowed to be empty',
  },
  passwordInvalid: {
    code: BAD_REQUEST,
    message: '"password" length must be 6 characters long',
  },
  requiredPassword: {
    code: BAD_REQUEST,
    message: '"password" is required',
  },
  registeredUser: {
    code: CONFLICT,
    message: 'User already registered',
  },
  loginError: {
    code: BAD_REQUEST,
    message: 'Invalid fields',
  },
};