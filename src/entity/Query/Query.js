'use strict';

const { addQuery } = require('./model');
const { gitApi } = require('../../config');

class Query {
  constructor({size, page = 1, sort, order} = {}) {
    this.size = size || gitApi.minUsers;
    this.page = page;
    this.qSort = sort || gitApi.srt;
    this.order = order || gitApi.order;
    this.query = {
      q: '',
      per_page: this.size,
      sort: this.qSort,
      order: this.order,
      page
    };
  }
  addLocation(location) {
    return addQuery({location}, this.query);
  }
  set pageSize(size) {
    this.query.per_page = size;
  }
}

module.exports = Query;
