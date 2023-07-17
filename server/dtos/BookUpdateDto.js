const BookCreateDto = require("./BookCreateDto");

class BookUpdateDto extends BookCreateDto {
  constructor(
    id,
    description,
    count,
    preview,
    name,
    pageCount,
    ageLimit,
    author_id
  ) {
    super(description, count, preview, name, pageCount, ageLimit, author_id);
    this.id = id;
  }
}

module.exports = BookUpdateDto;
