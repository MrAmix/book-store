const knex = require("../db");
const Book = require("../entities/Book");
const Price = require("../entities/Price");

class bookService {
  async getAll() {
    return knex("books").select();
  }

  async getOne(bookGetOneDto) {
    let one = {};
    one.book_id = bookGetOneDto.book_id;
    const GetOneBook = await knex("books").insert(one);
    return GetOneBook;
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
    await knex.transaction(async (trx) => {
      let book = {};
      book.description = bookCreateDto.description;
      book.count = bookCreateDto.count;
      book.preview = bookCreateDto.preview;
      book.name = bookCreateDto.name;
      const newBook = await trx("books").insert(book);

      let price = {};
      price.price = bookCreateDto.price;
      price.currency = bookCreateDto.currency;
      price.book_id = newBook.id;
      const newPrice = await trx("prices").insert(price);

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
