const knex = require("../db");
const Book = require("../entities/Book");
const Price = require("../entities/Price");
const Review = require("../entities/Review");
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
  async getBooks(basketId) {
    const result = await knex("baskets")
      .join(
        "baskets_have_books",
        "baskets_have_books.basket_id",
        "baskets.user_id"
      )
      .join("books", "baskets_have_books.book_id", "books.id")
      .join("prices", "prices.book_id", "books.id")
      .where({ user_id: basketId })
      .select(
        "books.*",
        "baskets_have_books.basket_id",
        "prices.price",
        "prices.currency",
        knex.raw(`
    (
      SELECT json_agg(
        json_build_object(
          'user', json_build_object('name', u.name, 'avatar', u.avatar),
          'text', r.text
        )
      )
      FROM reviews r
      INNER JOIN users u ON u.id = r.user_id
      WHERE books.id = r.book_id
    ) AS reviews
    `)
      );

    return result.map(
      (book) =>
        new Book(
          book.id,
          book.name,
          book.description,
          book.count,
          book.preview,
          book.page_count,
          book.age_limit,
          new Price(book.price, book.currency),
          book.reviews
        )
    );
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
