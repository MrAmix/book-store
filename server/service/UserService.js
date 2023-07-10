const knex = require("../db");
const UserUpdateDto = require("../dtos/UserUpdateDto");
const User = require("../entities/User");

class UserService {
  async update(id, userUpdateDto) {
    console.log(userUpdateDto);
    const updateUser = await knex("users").where("id", id).update({
      name: userUpdateDto.name,
      password: userUpdateDto.password,
      login: userUpdateDto.login,
      avatar: userUpdateDto.avatar,
    });

    return new User(
      updateUser.name,
      updateUser.login,
      updateUser.password,
      updateUser.createdAt,
      updateUser.updatedAt,
      updateUser.avatar
    );
  }
}

module.exports = new UserService();
