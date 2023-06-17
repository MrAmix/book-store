class ReviewCreateDto {
  constructor(text, book_id, user_id) {
    this.text = text;
    this.book_id = book_id;
    this.user_id = user_id;
  }
}

module.exports = ReviewCreateDto;
