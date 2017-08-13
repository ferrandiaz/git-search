'use strict';

module.exports.addQuery = (q, query) => {

  const queryArray = Object.keys(q).map(key => `${key}:${q[key]}+`);
  const queryString = queryArray.reduce((string, query) => string.concat(query));

  let unprocessedQuery = (query.q === '') ? queryString : `${query.q}+${queryString}`;

  query.q = unprocessedQuery.slice(0, -1);

  return query;
};
