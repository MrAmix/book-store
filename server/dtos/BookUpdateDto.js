const BookCreateDto = require("./BookCreateDto");

class BookUpdateDto extends BookCreateDto {
  constructor(id, description, count, preview, name, pageCount, ageLimit) {
    super(description, count, preview, name, pageCount, ageLimit);
    this.id = id;
  }
}

module.exports = BookUpdateDto;
