const knex = require("../db");
const Review = require("../entities/Review");
const User = require("../entities/User");
const Book = require("../entities/Book");
const Price = require("../entities/Price");
const { text } = require("express");

class ReviewService {
  async getAll() {
    const reviews = await knex("reviews")
      .innerJoin("users", "users.id", "=", "reviews.user_id")
      .innerJoin("books", "books.id", "=", "reviews.book_id")
      .join("prices", "prices.book_id", "=", "books.id")
      .select(
        "reviews.id",
        "reviews.text",
        "reviews.created_at",
        "reviews.updated_at",
        "books.id as book_id",
        "books.name as book_name",
        "books.description as book_description",
        "books.preview as book_preview",
        "books.count as book_count",
        "books.created_at as book_created_at",
        "books.updated_at as book_updated_at",
        "prices.price as book_price",
        "prices.currency as book_price_currency",
        "users.id as user_id",
        "users.name as user_name",
        "users.login as user_login",
        "users.password as user_password",
        "users.is_admin as user_is_admin",
        "users.created_at as user_created_at",
        "users.updated_at as user_updated_at"
      );

    return reviews.map(
      (review) =>
        new Review(
          review.id,
          review.text,
          review.created_at,
          review.updated_at,
          new Book(
            review.book_id,
            review.book_name,
            review.book_description,
            review.book_count,
            review.book_preview,
            new Price(review.book_price, review.book_price_currency)
          ),
          new User(
            review.user_id,
            review.user_name,
            review.user_login,
            review.user_password,
            review.user_is_admin,
            review.user_created_at,
            review.user_updated_at
          )
        )
    );
  }

  async delete(bookDeleteDto) {
    let eject = {};
    eject.book_id = bookDeleteDto.book_id;
    eject.user_id = bookDeleteDto.user_id;
    const deleteBook = await knex("reviews").insert(eject);
    return deleteBook;
  }

  async update(reviewUpdateDto) {
    return knex.transaction(async (trx) => {
      await trx("reviews")
        .where("id", reviewUpdateDto.id)
        .update({ text: reviewUpdateDto.text });

      const review = await trx("reviews")
        .innerJoin("users", "users.id", "=", "reviews.user_id")
        .innerJoin("books", "books.id", "=", "reviews.book_id")
        .join("prices", "prices.book_id", "=", "books.id")
        .where("reviews.id", reviewUpdateDto.id)
        .first(
          "reviews.id",
          "reviews.text",
          "reviews.created_at",
          "reviews.updated_at",
          "books.id as book_id",
          "books.name as book_name",
          "books.description as book_description",
          "books.preview as book_preview",
          "books.count as book_count",
          "books.created_at as book_created_at",
          "books.updated_at as book_updated_at",
          "prices.price as book_price",
          "prices.currency as book_price_currency",
          "users.id as user_id",
          "users.name as user_name",
          "users.login as user_login",
          "users.password as user_password",
          "users.is_admin as user_is_admin",
          "users.created_at as user_created_at",
          "users.updated_at as user_updated_at"
        );

      return new Review(
        review.id,
        review.text,
        review.created_at,
        review.updated_at,
        new Book(
          review.book_id,
          review.book_name,
          review.book_description,
          review.book_count,
          review.book_preview,
          new Price(review.book_price, review.book_price_currency)
        ),
        new User(
          review.user_id,
          review.user_name,
          review.user_login,
          review.user_password,
          review.user_is_admin,
          review.user_created_at,
          review.user_updated_at
        )
      );
    });
  }
  async getUserReviews(user_id) {
    return knex("reviews")
      .innerJoin("books", "books.id", "=", "reviews.book_id")
      .where({ user_id: user_id })
      .select(
        "reviews.id",
        "reviews.text",
        "reviews.created_at",
        "reviews.updated_at",
        "books.id as book_id",
        "books.name as book_name",
        "books.description as book_description",
        "books.preview as book_preview",
        "books.count as book_count",
        "books.created_at as book_created_at",
        "books.updated_at as book_updated_at"
      );
  }
  async create(reviewCreateDto) {
    return knex("reviews")
      .insert({
        user_id: reviewCreateDto.user_id,
        book_id: reviewCreateDto.book_id,
        text: reviewCreateDto.text,
      })
      .returning("*");
  }
}

module.exports = new ReviewService();
