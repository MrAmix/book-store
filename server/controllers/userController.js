require(`dotenv`).config();
const ApiError = require("../error/ApiError");
const authService = require("../service/AuthService");
const userService = require("../service/UserService");
const userRegistrationDto = require("../dtos/UserRegistrationDto");
const userLoginDto = require("../dtos/UserLoginDto");
const userUpdateDto = require("../dtos/UserUpdateDto");
const orderDto = require("../dtos/OrderDto");
const AlradyExistsError = require("../error/AlreadyExistsError");
const Crypto = require("../utils/Crypto");
const Jwt = require("../utils/Jwt");
const basketService = require("../service/BasketService");
const orderService = require("../service/OrderService");
const { json } = require("sequelize");

class UserController {
  async registration(req, res, next) {
    try {
      const { login, password, name } = req.body;
      const encryptedPassword = Crypto.encrypt(
        password,
        process.env.AUTH_SALT,
        process.env.AUTH_ITERATIONS
      );

      const newUser = await authService.registration(
        new userRegistrationDto(login, encryptedPassword, name)
      );

      return res.json(
        Jwt.create(newUser.id, login, newUser.is_admin ? "ADMIN" : "USER")
      );
    } catch (error) {
      if (error instanceof AlradyExistsError) {
        next(ApiError.conflict(error.message), req, res);
      }
    }
  }
  async login(req, res, next) {
    try {
      const { login, password } = req.body;
      const encryptedPassword = Crypto.encrypt(
        password,
        process.env.AUTH_SALT,
        process.env.AUTH_ITERATIONS
      );
      const user = await authService.login(
        new userLoginDto(login, encryptedPassword)
      );

      if (!user) {
        next(ApiError.notFound("wrong login or password"), req, res);
        return;
      }

      return res.json({
        user: user,
        jwt_token: Jwt.create(user.id, login, user.is_admin ? "ADMIN" : "USER"),
      });
    } catch (error) {
      console.error(error);
    }
  } // логин и пароль

  async createBasket(req, res) {
    const userId = req.params.id;
    const bookId = req.body.bookId;
    res.json(await userService.createBasket(userId, bookId));
  }

  async deleteBasket(req, res) {
    const userId = req.params.id;
    res.json(await basketService.delete(userId));
  }

  async addBookBasket(req, res) {
    const bookId = req.body.bookId;
    const basketId = req.params.basketId;
    res.json(basketService.addBook(bookId, basketId));
  }

  async createReview(req, res) {}

  //POST /api/users/:userd/orders
  async createOrder(req, res) {
    const order = await orderService.create(
      new orderDto(req.body.bookIds, req.params.id, "В обработке", new Date())
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
  async update(req, res) {
    const encryptedPassword = Crypto.encrypt(
      req.body.password,
      process.env.AUTH_SALT,
      process.env.AUTH_ITERATIONS
    );
    const newUser = userService.update(
      req.params.id,
      new userUpdateDto(
        req.body.name,
        req.body.login,
        encryptedPassword,
        req.file.filename
      )
    );
    res.json(newUser);
  }
}
module.exports = new UserController();
