class orderDto {
  constructor(book_id, user_id, status, delivered_at) {
    this.book_id = book_id;
    this.user_id = user_id;
    this.status = status;
    this.delivered_at = delivered_at;
  }
}

module.exports = orderDto;
