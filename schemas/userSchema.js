const { 
  nameInvalid, requiredEmail, emailInvalid, passwordInvalid, requiredPassword, 
} = require('../utils/errors');

const MIN_NAME_LENGTH = 8;
const MIN_PASSWORD_LENGTH = 6;

const validateName = (name) => {
  if (name.length < MIN_NAME_LENGTH) {
    const { code, message } = nameInvalid;
    return { code, message };
  } 
  return null;
};

const validateEmail = (email) => {
  const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!email) {
    const { code, message } = requiredEmail;
    return { code, message };
  }
  if (!EMAIL_REGEX.test(email) || email.length === 0) {
    const { code, message } = emailInvalid;
    return { code, message };
  }
};

const validatePassword = (password) => {
  if (!password) {
    const { code, message } = requiredPassword;
    return { code, message };
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    const { code, message } = passwordInvalid;
    return { code, message };
  }
};

const userValidation = ({ displayName, email, password }) => {
  const nameError = validateName(displayName);
  if (nameError) return nameError;
  const emailError = validateEmail(email);
  if (emailError) return emailError;
  const passwordError = validatePassword(password);
  if (passwordError) return passwordError;
  return null;
};

module.exports = {
  userValidation,
};