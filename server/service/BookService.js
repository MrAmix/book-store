const knex = require("../db");
const Book = require("../entities/Book");
const Price = require("../entities/Price");

class bookService {
  async getAll() {
    return knex("books").select().orderBy("id", "asc");
  }

  async getOne(bookGetOneDto) {
    const book = await knex("books")
      .first(
        "books.*",
        "prices.price",
        "prices.currency",
        knex.raw(`(
          SELECT json_agg(
            json_build_object(
              'user', json_build_object('name', u.name, 'avatar', u.avatar),
              'text', r.text
            )
          )
          FROM reviews r
          INNER JOIN users u ON u.id = r.user_id
          WHERE books.id = r.book_id
        ) AS reviews`)
      )
      .join("prices", "prices.book_id", "books.id")
      .where("books.id", bookGetOneDto.book_id);

    console.log(book);
    return new Book(
      book.id,
      book.name,
      book.description,
      book.count,
      book.preview,
      book.page_count,
      book.age_limit,
      new Price(book.price, book.currency),
      book.reviews
    );
  }

  async delete(bookDeleteDto) {
    let eject = {};
    eject.book_id = bookDeleteDto.book_id;
    eject.user_id = bookDeleteDto.user_id;
    const deleteBook = await knex("books").insert(eject);

    return deleteBook;
  }

  async update(bookUpdateDto) {
    const data = {};
    data.user_id = bookUpdateDto.user_id;
    data.description = bookUpdateDto.description;
    data.count = bookUpdateDto.count;
    data.preview = bookUpdateDto.preview;
    data.name = bookUpdateDto.name;
    data.pageCount = bookUpdateDto.pageCount;
    data.ageLimit = bookUpdateDto.ageLimit;
    const updateBook = await knex("books")
      .where("id", bookUpdateDto.id)
      .update(data);
    return updateBook;
  }

  async create(bookCreateDto) {
    return knex.transaction(async (trx) => {
      let book = {};
      book.description = bookCreateDto.description;
      book.count = bookCreateDto.count;
      book.preview = bookCreateDto.preview;
      book.name = bookCreateDto.name;
      book.page_count = bookCreateDto.pageCount;
      book.age_limit = bookCreateDto.ageLimit;

      const newBook = (await trx("books").insert(book).returning("*"))[0];

      let price = {};
      price.price = bookCreateDto.price;
      price.currency = bookCreateDto.currency;
      price.book_id = newBook.id;
      const newPrice = (await trx("prices").insert(price).returning("*"))[0];

      return new Book(
        newBook.id,
        newBook.name,
        newBook.description,
        newBook.count,
        newBook.preview,
        newBook.page_count,
        newBook.age_limit,
        new Price(newPrice.price, newPrice.currency)
      );
    });
  }
}

module.exports = new bookService();
