const knex = require("../db");
const UserUpdateDto = require("../dtos/UserUpdateDto");
const User = require("../entities/User");
const basketService = require("../service/BasketService");

class UserService {
  async update(id, userUpdateDto) {
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
  async createBasket(userId, bookId) {
    return knex.transaction(async (trx) => {
      const basket = await basketService.create(userId);
      console.log(basket);
      await basketService.addBook(bookId, basket[0].user_id);
      return basket.user_id;
    });
  }
}

module.exports = new UserService();
