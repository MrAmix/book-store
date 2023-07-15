class orderDto {
  constructor(bookIds, userId, status, deliveredAt) {
    this.bookIds = bookIds;
    this.userId = userId;
    this.status = status;
    this.deliveredAt = deliveredAt;
  }
}

module.exports = orderDto;
