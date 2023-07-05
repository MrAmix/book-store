//const knex = require("../db");
const bookCreateDto = require("../dtos/BookCreateDto");
const bookUpdateDto = require("../dtos/BookUpdateDto");
const bookDeleteDto = require("../dtos/BookDeleteDto");
const bookGetOneDto = require("../dtos/BookGetOneDto");
const bookService = require("../service/BookService");

class bookController {
  async getAll(req, res) {
    const books = await bookService.getAll();
    res.json(books);
  }

  async getOne(req, res) {
    console.log(req.params);
    const getOneBook = await bookService.getOne(
      new bookGetOneDto(req.params.id)
    );
    res.json(getOneBook);
  }

  async delete(req, res) {
    const deleteBook = bookService.delete(
      new bookDeleteDto(req.body.book_id, req.body.user_id)
    );
    res.json(deleteBook);
  }

  async update(req, res) {
    const updateBook = bookService.update(
      new bookUpdateDto(
        req.params.id,
        req.body.description,
        req.body.count,
        req.body.preview,
        req.body.name
      )
    );
    res.json(updateBook);
  }

  async create(req, res) {
    console.log(req.body);
    const newBook = bookService.create(
      new bookCreateDto(
        req.body.description,
        req.body.count,
        req.file.filename,
        req.body.name,
        req.body.currency,
        req.body.price,
      )
    );
    res.json(newBook);
  }
}

module.exports = new bookController();

//validation joi https://github.com/hapijs/joi
