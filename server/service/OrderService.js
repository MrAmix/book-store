const { DateTime } = require("luxon");
const knex = require("../db");
class OrderService {
  async create(orderDto) {
    const newOrder = await knex("orders").insert(
      orderDto.bookIds.map((bookId) => {
        return {
          book_id: bookId,
          user_id: orderDto.userId,
          status: orderDto.status,
          delivered_at: DateTime.fromJSDate(orderDto.deliveredAt)
            .plus({ day: Math.floor(Math.random() * (10 - 3 + 1) + 3) })
            .toJSDate(),
        };
      })
    );
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
