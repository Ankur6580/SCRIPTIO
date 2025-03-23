const isEmail = require("validator/lib/isEmail");
const isStrongPassword = require("validator/lib/isStrongPassword")

exports.validateEmail = (email) => {
  return isEmail(email);
}

exports.validatePassword = (password) => {
  return isStrongPassword(password);
}