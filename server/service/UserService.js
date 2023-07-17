const knex = require("../db");
const User = require("../entities/User");
const basketService = require("../service/BasketService");

class UserService {
  async update(id, userUpdateDto) {
    const result = await knex("users")
      .where("id", id)
      .update({
        name: userUpdateDto.name,
        password: userUpdateDto.password,
        login: userUpdateDto.login,
        avatar: userUpdateDto.avatar,
      })
      .returning("*");

    const updateUser = result[0];

    return new User(
      updateUser.id,
      updateUser.name,
      updateUser.login,
      updateUser.password,
      updateUser.created_at,
      updateUser.updated_at,
      updateUser.avatar,
      updateUser.is_admin
    );
  }

  async createBasket(userId, bookId) {
    return knex.transaction(async (trx) => {
      const basket = await basketService.create(userId);
      await basketService.addBook(bookId, basket[0].user_id);
      return basket.user_id;
    });
  }
}

module.exports = new UserService();
