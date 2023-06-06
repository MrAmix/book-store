const crypto = require("crypto");

class Crypto {
  static encrypt(data, salt, iterations) {
    return crypto
      .pbkdf2Sync(
        data,
        salt.toString("base64"),
        Number(iterations),
        64,
        `sha512`
      )
      .toString("hex");
  }
}

module.exports = Crypto;
