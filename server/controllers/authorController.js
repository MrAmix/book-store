const authorService = require("../service/AuthorService");

class AuthorController {
  async getAll(req, res) {
    const authors = await authorService.getAll();
    res.json(authors);
  }

  async create(req, res) {
    const author = await authorService.create(req.body.name);

    res.json(author);
  }
}

module.exports = new AuthorController();

//validation joi https://github.com/hapijs/joi
