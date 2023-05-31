const knex = require("../db");

class OrderService {
  async create(orderDto) {
    let estimation = {};
    estimation.status = orderDto.status;
    estimation.delivered_at = orderDto.delivered_at;
    estimation.book_id = orderDto.book_id;
    estimation.user_id = orderDto.user_id;
    const newOrder = await knex("orders").insert(estimation);
    return newOrder;
  }
  async delete(orderDeleteDto) {
    return knex("orders").where("id", orderDeleteDto.id).delete();
  }
  async getAll() {
    return knex("orders").select();
  }

  async getOne(orderOneDto) {
    return knex("orders").where("id", orderOneDto.id).first();
  }

  async getUserOrders(user_id) {
    return knex("orders").where("user_id", user_id).select();
  }
}

module.exports = new OrderService();
