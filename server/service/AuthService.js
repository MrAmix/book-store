const knex = require("../db");

class authService {
  async registration(userRegistrationDto) {
    let auth = {}; //FIXME название переменной кал
    auth.name = userRegistrationDto.name;
    auth.login = userRegistrationDto.login;
    auth.password = userRegistrationDto.password;
    const newUser = await knex("users").insert(auth);
    return newUser;
  }
}

module.exports = new authService();
