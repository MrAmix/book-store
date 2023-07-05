const knex = require("../db");
const Book = require("../entities/Book");
const Price = require("../entities/Price");

class bookService {
  async getAll() {
    return knex("books").select().orderBy("id", "asc");
  }

  async getOne(bookGetOneDto) {
    console.log(bookGetOneDto);
    const book = await knex("books")
      .join("prices", "prices.book_id", "=", "books.id")
      .where("books.id", bookGetOneDto.book_id)
      .first(
        "books.id as book_id",
        "books.name as book_name",
        "books.description as book_description",
        "books.preview as book_preview",
        "books.count as book_count",
        "books.created_at as book_created_at",
        "books.updated_at as book_updated_at",
        "prices.price as book_price",
        "prices.currency as book_price_currency"
      );
    console.log(book);
    return new Book(
      book.book_id,
      book.book_name,
      book.book_description,
      book.book_count,
      book.book_preview,
      new Price(book.book_price, book.book_price_currency)
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

    const updateBook = await knex("books")
      .where("id", bookUpdateDto.id)
      .update(data);
    return updateBook;
  }

  async create(bookCreateDto) {
    console.log(bookCreateDto);
    await knex.transaction(async (trx) => {
      let book = {};
      book.description = bookCreateDto.description;
      book.count = bookCreateDto.count;
      book.preview = bookCreateDto.preview;
      book.name = bookCreateDto.name;
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
        new Price(newPrice.price, newPrice.currency)
      );
    });
  }
}

module.exports = new bookService();
