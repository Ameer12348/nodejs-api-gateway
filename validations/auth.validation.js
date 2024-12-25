const Joi = require("@hapi/joi");
const { password } = require("./custom.validation");

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const resetPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};
const tokenValidation = {
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  resetPassword,
};
