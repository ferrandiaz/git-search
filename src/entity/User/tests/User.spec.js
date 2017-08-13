/* eslint-env mocha */
'use strict';

const proxyquire = require('proxyquire');
const chai = require('chai');
const { expect } = chai;
const { stub } = require('sinon');

let parseUserStub = stub();

const User = proxyquire('../User', {
  './model': {parseUser: parseUserStub}
});

describe('User', function () {
  describe('parse', function () {
    it('should return the user parsed', function () {
      parseUserStub.returns('test');
      return expect(new User().parse()).to.equal('test');
    });
  });
});
