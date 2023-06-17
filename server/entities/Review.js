class Review {
  constructor(id, text, createdAt, updatedAt, book, user) {
    this.id = Number(id);
    this.text = text;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.book = book;
    this.user = user;
  }
}
module.exports = Review;
