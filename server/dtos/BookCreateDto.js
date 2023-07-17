class BookCreateDto {
  constructor(
    description,
    count,
    preview,
    name,
    currency,
    price,
    pageCount,
    ageLimit,
    author_id
  ) {
    this.description = description;
    this.count = Number(count);
    this.preview = preview;
    this.name = name;
    this.price = Number(price);
    this.currency = currency;
    this.pageCount = Number(pageCount);
    this.ageLimit = Number(ageLimit);
    this.author_id = author_id;
  }
}

module.exports = BookCreateDto;
