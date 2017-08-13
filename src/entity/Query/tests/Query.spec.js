/* eslint-env mocha */
'use strict';

const proxyquire = require('proxyquire');
const chai = require('chai');
const { expect } = chai;
const { stub } = require('sinon');

const addQueryStub = stub().returns('test');
const gitApiMock = {
  srt: 'test',
  order: 'test',
  minUsers: 1
};

const Query = proxyquire('../Query', {
  './model': { addQuery: addQueryStub},
  '../../config': {gitApi: gitApiMock}
});

describe('Query', function () {
  describe('addLocation', function () {
    it('should add Location', function () {
      const q = new Query();

      return expect(q.addLocation('test')).to.equal('test')
    });
  });
  describe('pageSize', function () {
    it('should change per_page', function () {
      const q = new Query();

      q.pageSize = 3;
      return expect(q).to.have.deep.property('query.per_page', 3)
    });
  });
});
