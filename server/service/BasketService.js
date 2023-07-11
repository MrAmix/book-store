const knex = require("../db");

class BasketService {
  async create(userId) {
    return knex("baskets").insert({ user_id: userId }).returning("*");
  }
  async addBook(bookId, basketId) {
    return knex("baskets_have_books").insert({
      book_id: bookId,
      basket_id: basketId,
    });
  }
  async deleteBook(bookId, basketId) {
    return knex("baskets_have_books")
      .where({
        book_id: bookId,
        basket_id: basketId,
      })
      .delete();
  }
  async delete(userId) {
    return knex("baskets").where({ user_id: userId }).delete();
  }
}

module.exports = new BasketService();
