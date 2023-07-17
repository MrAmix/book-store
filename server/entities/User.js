class User {
  constructor(
    id,
    name,
    login,
    password,
    createdAt,
    updatedAt,
    avatar,
    isAdmin
  ) {
    this.id = Number(id);
    this.name = name;
    this.login = login;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.avatar = avatar;
    this.is_admin = isAdmin;
  }
}
module.exports = User;
