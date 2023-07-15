const basketService = require("../service/BasketService");

class BasketConroller {
  async getBooks(req, res) {
    const basketId = req.params.basketId;
    res.json(await basketService.getBooks(basketId));
  }
  async deleteBook(req, res) {
    const bookId = req.params.bookId;
    const basketId = req.params.basketId;
    res.json(await basketService.deleteBook(bookId, basketId));
  }
}

module.exports = new BasketConroller();
