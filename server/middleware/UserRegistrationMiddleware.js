const ApiError = require("../error/ApiError");
const Joi = require("joi");

module.exports = function (req, res, next) {
  const schema = Joi.object({
    login: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    name: Joi.string().alphanum().min(3).max(30).required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    throw ApiError.badrequest(error.details.map((detail) => detail.message));
  }

  next();
};
