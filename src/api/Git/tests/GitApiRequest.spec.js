/* eslint-env mocha */
'use strict';

const proxyquire = require('proxyquire');
const chai = require('chai');
const { expect } = chai;
const { stub, spy } = require('sinon');

chai.use(require('chai-as-promised'));

let loggerMock = {
  error: spy()
};

let errorStub, responseStub;
let endStub = function (cb) {
  cb(errorStub, responseStub);
  return this;
};
const superAgentMock = {
  get: stub().returnsThis(),
  query: stub().returnsThis(),
  timeout: stub().returnsThis(),
  end: endStub
};

const GitApiRequest = proxyquire('../GitApiRequest', {
  'superagent': superAgentMock,
  '../../config': {gitApi: {url: 'test', timeout: '500'}},
  '../../lib/logger': loggerMock
});

describe('GitApiRequest', function () {
  describe('get', function () {
    it('should reject if request response error', function () {
      errorStub = 'test';
      return expect(GitApiRequest.get('test', 'test')).to.be.rejected
        .then(error => {
          expect(error).to.equal('test');
        });
    });
    it('should resolve if request response correctly', function () {
      errorStub = null;
      responseStub = {};
      return expect(GitApiRequest.get('test', 'test')).to.become({});
    });
  });
});
