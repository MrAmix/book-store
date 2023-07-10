class Book {
  constructor(
    id,
    name,
    description,
    count,
    preview,
    pageCount,
    ageLimit,
    price,
    reviews
  ) {
    this.id = Number(id);
    this.name = name;
    this.description = description;
    this.count = count;
    this.preview = preview;
    this.pageCount = pageCount;
    this.ageLimit = ageLimit;
    this.price = price;
    this.reviews = reviews || [];
  }
}
module.exports = Book;
