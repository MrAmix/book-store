class Book {
  constructor(id, name, description, count, preview, price) {
    this.name = name;
    this.description = description;
    this.count = count;
    this.preview = preview;
    this.price = price;
    this.id = id;
  }
}
module.exports = Book;
