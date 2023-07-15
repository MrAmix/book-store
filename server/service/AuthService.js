const knex = require("../db");
const userRegistrationDto = require("../dtos/UserRegistrationDto");
const userLoginDto = require("../dtos/UserLoginDto");
const AlradyExistsError = require("../error/AlreadyExistsError");
class authService {
  async registration(userRegistrationDto) {
    try {
      let auth = {};
      auth.name = userRegistrationDto.name;
      auth.login = userRegistrationDto.login;
      auth.password = userRegistrationDto.password;
      const newUser = await knex("users").insert(auth, "*");

      return newUser[0];
    } catch (error) {
      if (error.code === "23505") {
        throw new AlradyExistsError(error);
      }
    }
  }

  async login(userLoginDto) {
    return knex("users")
      .where({
        login: userLoginDto.login,
        password: userLoginDto.password,
      })
      .leftJoin("baskets", "baskets.user_id", "users.id")
      .leftJoin(
        "baskets_have_books",
        "baskets_have_books.basket_id",
        "baskets.user_id"
      )
      .count("baskets_have_books.book_id as booksCount")
      .groupBy("users.id", "baskets.user_id", "baskets_have_books.basket_id")
      .first("users.*", "baskets.*");
  }
}

module.exports = new authService();
