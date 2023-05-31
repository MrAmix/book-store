class BookCreateDto {
  constructor(description, count, preview, name) {
    this.description = description;
    this.count = count;
    this.preview = preview;
    this.name = name;
  }
}

module.exports = BookCreateDto;
