//const knex = require("../db");
const ApiError = require("../error/ApiError");
const AuthService = require("../service/AuthService");
const userRegistrationDto = require("../dtos/UserRegistrationDto");
const userLoginDto = require("../dtos/UserLoginDto");

class UserController {
  async registration(req, res) {
    const newUser = AuthService.registration(
      new userRegistrationDto(req.body.login, req.body.password, req.body.name)
    );
    res.json(newUser);
  }
  //ПРОВЕРИТЬ
  async login(req, res) {
    const user = userService.registration(
      new userLoginDto(req.body.login, req.body.password)
    );
    res.json(user);
  } // логин и пароль

  async createBasket(req, res) {}

  //POST /api/users/:user_id/orders
  async createOrder(req, res) {
    //Прописывать ли status?
    req.body.map((book) => {
      if (book.count > 5) {
        throw Error("TEST");
      }
    });
    //req.params.user_id???
    //req.body.book_ids []book_id???
    const order = orderService.create(
      new orderDto(
        req.body.book_id,
        req.body.user_id,
        req.body.status,
        req.body.delivered_at
      )
    );
    res.json(order);
  }

  async check(req, res, next) {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badrequest(`Не задан ID`));
    }
  }

  async getOrders(req, res, next) {
    const userOrders = await orderService.getUserOrders(req.params.id);
    res.json(userOrders);
  }

  async getOrder(req, res, next) {
    const userOrder = await orderService.getOne(
      new orderOneDto(req.params.order_id)
    );
    res.json(userOrder);
  }
}
module.exports = new UserController();
