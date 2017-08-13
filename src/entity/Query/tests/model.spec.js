/* eslint-env mocha */
'use strict';

const proxyquire = require('proxyquire');
const chai = require('chai');
const { expect } = chai;


const model = proxyquire('../model', {});

describe('model', function () {
  describe('addQuery', function () {
    it('should return an object query with only new parameters if query.q does not have ones', function () {
      const q = { test: 'test', test2: 'test2'};
      const query = { q: ''};
      const result = { q: 'test:test+test2:test2'}

      return expect(model.addQuery(q, query)).to.deep.equal(result);
    });
    it('should return an object query with queryParams concatenated to the old ones', function () {
      const q = { test: 'test', test2: 'test2'};
      const query = { q: 'darth:vader'};
      const result = { q: 'darth:vader+test:test+test2:test2'}

      return expect(model.addQuery(q, query)).to.deep.equal(result);
    });
  });
});
