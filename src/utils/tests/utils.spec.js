/* eslint-env mocha */
'use strict';

const proxyquire = require('proxyquire');
const chai = require('chai');
const { expect } = chai;
const { stub, assert } = require('sinon');


const utils = proxyquire('../utils', {
  '../config': {gitApi: {pageSize: 10}}
});

describe('utils', function () {
  describe('getNumRequests', function () {
    it('should return 3 if the number of requests is 30 and the max is 10', function () {
      return expect(utils.getNumRequests(30, 10)).to.equal(3);
    });
    it('should return 4 if the number of requests is 31 and the max is 10', function () {
      return expect(utils.getNumRequests(31, 10)).to.equal(4);
    });
  });
  describe('getRequestsOverPageSize', function () {
    it('should return an array with function fn called twice', function () {
      const fn = stub().returns('test');
      const query = {};

      expect(utils.getRequestsOverPageSize(fn, 'test', query, 20)).to.deep.equal(['test', 'test']);
      assert.calledTwice(fn);
    });
  });
});
