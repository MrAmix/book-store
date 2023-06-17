class Book {
  constructor(id, name, description, count, preview, price) {
    this.id = Number(id);
    this.name = name;
    this.description = description;
    this.count = count;
    this.preview = preview;
    this.price = price;
  }
}
module.exports = Book;
