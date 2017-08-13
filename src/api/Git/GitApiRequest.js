'use strict';

const request = require('superagent');
const {gitApi: { url, timeout }} = require('../../config');
const logger = require('../../lib/logger');

class GitApiRequest {
  get(route, query) {
    return new Promise((resolve, reject) => {
      request
        .get(`${url}/${route}`)
        .query(query)
        .timeout(timeout)
        .end((err, res) => {
          if(err) logger.error('On request to external api');
          return err ? reject(err) : resolve(res.body || {});
        });
    });
  }
}

module.exports = new GitApiRequest();
