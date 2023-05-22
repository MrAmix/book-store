const knex = require("../db");
class bookController {
  async book(req, res) {}

  async getAll(req, res) {}
  async getOne(req, res) {}

  async create(req, res) {
    //validation joi https://github.com/hapijs/joi
    let add = {};
    add.name = req.body.name;
    add.description = req.body.description;
    add.count = req.body.count;
    add.preview = req.body.preview;
    await knex("books").insert(add);
    res.json(1);
  }
}
module.exports = new bookController();
