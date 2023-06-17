const bookUpdateDto = require("../dtos/BookUpdateDto");
const ReviewUpdateDto = require("../dtos/reviewUpdateDto");
const reviewService = require("../service/reviewService");
class ReviewController {
  async getAll(req, res) {
    const reviews = await reviewService.getAll();
    res.json(reviews);
  }

  async delete(req, res) {
    const deleteReview = reviewService.delete(
      new reviewDeleteDto(req.body.book_id, req.body.user_id)
    );
    res.json(deleteReview);
  }

  async update(req, res) {
    const { id } = req.params;
    const { text } = req.body;
    const review = await reviewService.update(new ReviewUpdateDto(id, text));
    return res.json(review);
  }
}

module.exports = new ReviewController();

//validation joi https://github.com/hapijs/joi
