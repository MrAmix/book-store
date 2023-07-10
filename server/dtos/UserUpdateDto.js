class UserUpdateDto {
  constructor(name, login, password, avatar) {
    this.name = name;
    this.login = login;
    this.password = password;
    this.avatar = avatar;
  }
}

module.exports = UserUpdateDto;
