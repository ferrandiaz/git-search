'use strict';

const { gitApi: { pageSize }} = require('../config');

const getNumRequests = (num, max) => {
  let numRequests = parseInt(num / max);
  const rest = num % max;

  if(rest) numRequests++;
  return numRequests;
};

const getRequestsOverPageSize = (reqFunc, route, query, size) => {
  const requests = [];
  const numRequests = getNumRequests(size, pageSize);

  query.pageSize = pageSize;
  for(let page = 1; page <= numRequests; page++) {
    query.page = page;
    let request = reqFunc(route, query);

    requests.push(request);
  }
  return requests;
};

module.exports = {
  getNumRequests,
  getRequestsOverPageSize
};
