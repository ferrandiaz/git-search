'use srtict';

const { gitApi: { pageSize, minUsers }} = require('../config');
const { GitApi } = require('../api');
const { utils: { getRequestsOverPageSize }} = require('../utils');
const { Query } = require('../entity');

class UserService {
  getUsersByLocation(location, size = minUsers) {
    const query = new Query({size}).addLocation(location);

    if(size <= pageSize) {
      return GitApi.search('users', query)
        .then(({items = []}) => items);
    }

    return Promise.all(getRequestsOverPageSize(GitApi.search, 'users', query, size))
      .then(users => {
        return users.reduce((arr, {items = []}) => arr.concat(items), []).slice(0, size);
      });
  }
}
module.exports = UserService;
