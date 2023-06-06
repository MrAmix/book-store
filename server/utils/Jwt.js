require(`dotenv`).config();
const jwt = require("jsonwebtoken");

class Jwt {
  static create(userId, login, role) {
    return jwt.sign(
      {
        id: userId,
        login,
        role,
      },
      process.env.AUTH_SECRET,
      {
        expiresIn: "12h",
      }
    );
  }
  static verify(token) {
    return jwt.verify(token, process.env.AUTH_SECRET);
  }
}

module.exports = Jwt;
