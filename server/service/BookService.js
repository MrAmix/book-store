const knex = require("../db");
//const { all } = require("../routers/usersRouter");

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
    let create = {};
    create.description = bookCreateDto.description;
    create.count = bookCreateDto.count;
    create.preview = bookCreateDto.preview;
    create.name = bookCreateDto.name;
    const newBook = await knex("books").insert(create);
    return newBook;
  }
}

module.exports = new bookService();
