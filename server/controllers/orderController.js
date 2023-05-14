const knex = require("../db");
class OrderController {
  async order(req, res) {
    let add = {};
    add.book_id = req.body.book_id;
    add.user_id = req.body.user_id;
    //add.count = req.body.count;
    await knex("orders").insert(add);
    res.json(1);
  }
}
module.exports = new OrderController();
