const knex = require("../db");
const userRegistrationDto = require("../dtos/UserRegistrationDto");
const userLoginDto = require("../dtos/UserLoginDto");

class authService {
  async registration(userRegistrationDto) {
    let auth = {}; //FIXME название переменной кал
    auth.name = userRegistrationDto.name;
    auth.login = userRegistrationDto.login;
    auth.password = userRegistrationDto.password;
    const newUser = await knex("users").insert(auth);
    return newUser;
  }

  async login(userLoginDto) {
    return knex("users")
      .where({
        login: userLoginDto.login,
        password: userLoginDto.password,
      })
      .first();
  }
}

module.exports = new authService();
