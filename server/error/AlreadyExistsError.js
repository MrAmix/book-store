class AlradyExistsError extends Error {
  constructor(error) {
    super();
    this.message = error.message;
  }
}

module.exports = AlradyExistsError;
