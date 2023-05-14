const ApiError = require("../error/ApiError");

class userController {
  async registration(req, res) {}

  async login(req, res) {
    res.json(req.body);
  }

  async baskets(req, res) {}
  async check(req, res, next) {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badrequest(`Не задан ID`));
    }
  }
}
module.exports = new userController();
