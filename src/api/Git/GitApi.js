'use strict';

const request = require('./GitApiRequest');

class GitApi {
  search(route, query) {
    return request.get(`search/${route}`, query);
  }
}

module.exports = new GitApi();
