const knex = require("../db");
const ApiError = require("../error/ApiError");

class userController {
  //FIXME нание классов с большой буквы
  async registration(req, res) {
    //TODO вынести бизнес логику в class service -> например, UserService для работы с апи
    //TODO А логику регистрации и авторизации я бы вообще лучше вынес в, например, AuthService
    let add = {}; //FIXME название переменной кал
    add.name = req.body.name;
    add.login = req.body.login;
    add.password = req.body.password;
    console.log(req.body); //FIXME cl быть в коде не должно
    const order = await knex("users").insert(add);
    console.log(order);
    res.json(1);
  }

  async login(req, res) {
    let login = "Alice";
    console.log(login);
  }

  async baskets(req, res) {}
  async name(req, res) {}
  async check(req, res, next) {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badrequest(`Не задан ID`));
    }
  }
}
module.exports = new userController();
