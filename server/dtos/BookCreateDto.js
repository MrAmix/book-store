class BookCreateDto {
  constructor(description, count, preview, name, currency, price) {
    this.description = description;
    this.count = count;
    this.preview = preview;
    this.name = name;
    this.price = price;
    this.currency = currency;
  }
}

module.exports = BookCreateDto;
