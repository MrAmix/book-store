require(`dotenv`).config();
const ApiError = require("../error/ApiError");
const authService = require("../service/AuthService");
const userService = require("../service/UserService");
const userRegistrationDto = require("../dtos/UserRegistrationDto");
const userLoginDto = require("../dtos/UserLoginDto");
const userUpdateDto = require("../dtos/UserUpdateDto");
const AlradyExistsError = require("../error/AlreadyExistsError");
const Crypto = require("../utils/Crypto");
const Jwt = require("../utils/Jwt");
const basketService = require("../service/BasketService");

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
      console.log(error);
    }
  } // логин и пароль

  async createBasket(req, res) {
    const userId = req.params.id;
    const bookId = req.body.bookId;
    return userService.createBasket(userId, bookId);
  }
  async addBookBasket(req, res) {
    const bookId = req.body.bookId;
    const basketId = req.params.basketId;
    res.json(basketService.addBook(bookId, basketId));
  }

  async createReview(req, res) {}

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
