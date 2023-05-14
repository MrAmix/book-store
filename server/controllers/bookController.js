const knex = require("../db");
class bookController {
  async book(req, res) {}

  async getAll(req, res) {}
  async getOne(req, res) {}

  async create(req, res) {
    let add = {};
    add.name = req.body.name;
    add.description = req.body.description;
    add.count = req.body.count;
    await knex("books").insert(add);
    res.json(123);
  }
}
module.exports = new bookController();
