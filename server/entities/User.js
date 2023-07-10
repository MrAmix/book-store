class User {
  constructor(id, name, login, password, createdAt, updatedAt, avatar) {
    this.id = Number(id);
    this.name = name;
    this.login = login;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.avatar = avatar;
  }
}
module.exports = User;
