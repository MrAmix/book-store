const userLoginDto = require("./UserLoginDto");

class userRegistrationDto extends userLoginDto {
  constructor(login, password, name) {
    super(login, password);
    this.name = name;
  }
}

module.exports = userRegistrationDto;
