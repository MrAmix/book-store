class BookCreateDto {
  constructor(description, count, preview, name, currency, price) {
    this.description = description;
    this.count = Number(count);
    this.preview = preview;
    this.name = name;
    this.price = Number(price);
    this.currency = currency;
  }
}

module.exports = BookCreateDto;
