class ReviewUpdateDto {
  constructor(id, text) {
    this.id = Number(id);
    this.text = text;
  }
}

module.exports = ReviewUpdateDto;
