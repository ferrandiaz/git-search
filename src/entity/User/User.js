'use strict';

const { parseUser } = require('./model');

class User {
  constructor(user = {}) {
    this.user = user;
  }
  parse() {
    return parseUser(this.user);
  }
}
module.exports = User;
