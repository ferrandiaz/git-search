/* eslint-env mocha */
'use strict';

const proxyquire = require('proxyquire');
const chai = require('chai');
const { expect } = chai;
const { stub } = require('sinon');

const model = proxyquire('../model', {});

describe('user/model', function () {
  describe('parseUser', function () {
    it('should return only some parameters of the user', function () {
      const user = { login: 'test', id: 'test2', html_url: 'test3', repos_url: 'test4', field: 'not showed'};
      const expected = { user: 'test', user_id: 'test2', user_url: 'test3', repos_url: 'test4'};

      return expect(model.parseUser(user)).to.deep.equal(expected);
    });
  });
});
