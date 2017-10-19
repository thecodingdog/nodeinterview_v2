class NotFound extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

class NotAuthorized extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

class BadRequest extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

class Forbidden extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

module.exports = {
  NotFound,
  NotAuthorized,
  BadRequest,
  Forbidden
};
