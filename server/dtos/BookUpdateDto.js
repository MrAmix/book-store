const BookCreateDto = require("./BookCreateDto");

class BookUpdateDto extends BookCreateDto {
  constructor(id, description, count, preview, name) {
    super(description, count, preview, name);
    this.id = id;
  }
}

module.exports = BookUpdateDto;
