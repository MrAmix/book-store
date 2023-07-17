const knex = require("../db");

class bookService {
  async getAll() {
    return knex("authors").select().orderBy("id", "asc");
  }

  async create(name) {
    const result = await knex("authors").insert({ name }).returning("*");
    return result[0];
  }
}

module.exports = new bookService();
