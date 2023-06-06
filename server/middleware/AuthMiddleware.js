const Jwt = require("../utils/Jwt");
const ApiError = require("../error/ApiError");
module.exports = function (req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    throw ApiError.unauthorized("Unauthorized");
  }

  req.user = Jwt.verify(token);
  next();
};
