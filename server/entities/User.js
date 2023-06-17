class User {
  constructor(id, name, login, password, createdAt, updatedAt) {
    this.id = Number(id);
    this.name = name;
    this.login = login;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
module.exports = User;
