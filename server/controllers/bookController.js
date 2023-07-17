//const knex = require("../db");
const bookCreateDto = require("../dtos/BookCreateDto");
const bookUpdateDto = require("../dtos/BookUpdateDto");
const bookDeleteDto = require("../dtos/BookDeleteDto");
const bookGetOneDto = require("../dtos/BookGetOneDto");
const reviewCreateDto = require("../dtos/reviewCreateDto");
const bookService = require("../service/BookService");
const reviewService = require("../service/reviewService");

class bookController {
  async getAll(req, res) {
    const books = await bookService.getAll();
    res.json(books);
  }

  async getOne(req, res) {
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
    console.log(req.params);
    console.log(req.body);
    const updateBook = bookService.update(
      req.params.id,
      req.file.filename,
      req.body
    );
    res.json(updateBook);
  }

  async create(req, res) {
    const newBook = await bookService.create(
      new bookCreateDto(
        req.body.description,
        req.body.count,
        req.file.filename,
        req.body.name,
        req.body.currency,
        req.body.price,
        req.body.pageCount,
        req.body.ageLimit,
        req.body.author_id
      )
    );

    res.json(newBook);
  }

  async createReview(req, res) {
    console.log(req.body);
    const newReview = await reviewService.create(
      new reviewCreateDto(req.body.review, req.params.id, req.body.user_id)
    );
    res.json(newReview);
  }
}

module.exports = new bookController();

//validation joi https://github.com/hapijs/joi
