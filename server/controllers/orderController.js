const knex = require("../db");
class OrderController {
  async order(req, res) {
    let add = {};
    add.book_id = req.body.book_id;
    add.user_id = req.body.user_id;
    console.log(req.body);
    const order = await knex("orders").insert(add);
    console.log(order);
    res.json(1);
  }
}
module.exports = new OrderController();
