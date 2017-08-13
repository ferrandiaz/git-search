/* eslint-env mocha */
'use strict';

const proxyquire = require('proxyquire');
const chai = require('chai');
const { expect } = chai;
const { stub } = require('sinon');

chai.use(require('chai-as-promised'));

let getStub = stub();
const requestMock = {
  get: getStub
};

const GitApi = proxyquire('../GitApi', {
  './GitApiRequest': requestMock
});

describe('GitApi', function () {
  describe('search', function () {
    it('should resolve', function () {
      getStub.resolves('test');
      return expect(GitApi.search('test', 'test')).to.become('test');
    });
  });
});
