const ApiError = require("../error/ApiError");
const Joi = require("joi");

module.exports = function (req, res, next) {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(2).max(60).required(),
    description: Joi.string().alphanum().max(255),
    count: Joi.number().min(0).max(100).required(),
    preview: Joi.number()
      .max(255)
      .pattern(
        new RegExp(
          /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
        )
      ),
    price: Joi.number().min(10).max(100000).required(),
    currency: Joi.string().in(["RUB"]).required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    throw ApiError.badrequest(error.details.map((detail) => detail.message));
  }

  next();
};
