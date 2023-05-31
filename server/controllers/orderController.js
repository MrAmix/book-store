const orderService = require("../service/OrderService");
const orderDeleteDto = require("../dtos/OderDeleteDto");
const orderOneDto = require("../dtos/OrderOneDto");
class OrderController {
  async delete(req, res) {
    await orderService.delete(new orderDeleteDto(req.params.id));
    res.json("ok");
  }

  async getAll(req, res) {
    const orders = await orderService.getAll();
    res.json(orders);
  }

  async getOne(req, res) {
    const order = await orderService.getOne(new orderOneDto(req.params.id));
    res.json(order);
  }

  //Прописывать ли status?
  //DELETE /api/orders/:id
  //GET /api/orders/:id
  //GET /api/orders
}
module.exports = new OrderController();
