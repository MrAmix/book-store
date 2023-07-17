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
        "authors.name as authorName",
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
      .join("authors", "authors.id", "books.author_id")
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
      book.reviews,
      book.authorName
    );
  }

  async delete(bookDeleteDto) {
    let eject = {};
    eject.book_id = bookDeleteDto.book_id;
    eject.user_id = bookDeleteDto.user_id;
    const deleteBook = await knex("books").insert(eject);

    return deleteBook;
  }

  async update(bookId, fileName, reqBody) {
    console.log("QA");
    console.log(bookId);
    console.log(fileName);
    console.log(reqBody);
    console.log("QA");
    const data = {};
    data.description = reqBody.description;
    data.count = reqBody.count;
    data.preview = fileName;
    data.name = reqBody.name;
    data.page_count = reqBody.pageCount;
    data.age_limit = reqBody.ageLimit;
    data.author_id = reqBody.author_id;
    console.log(data);

    const updateBook = await knex("books").where("id", bookId).update(data);
    return updateBook;
  }

  async create(bookCreateDto) {
    console.log(bookCreateDto);
    return knex.transaction(async (trx) => {
      let book = {};
      book.description = bookCreateDto.description;
      book.count = bookCreateDto.count;
      book.preview = bookCreateDto.preview;
      book.name = bookCreateDto.name;
      book.page_count = bookCreateDto.pageCount;
      book.age_limit = bookCreateDto.age_limit;
      book.author_id = bookCreateDto.author_id;

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
        newBook.author_id,
        new Price(newPrice.price, newPrice.currency)
      );
    });
  }
}

module.exports = new bookService();
