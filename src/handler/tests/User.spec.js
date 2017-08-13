/* eslint-env mocha */
'use strict';

const proxyquire = require('proxyquire');
const { stub, assert } = require('sinon');

let usersByLocationStub = stub();
let statusStub = stub();
let sendStub = stub();
const res = {
  status: statusStub.returnsThis(),
  send: sendStub
};
const UserServiceMock = stub().returns({
  getUsersByLocation: usersByLocationStub
});
const UserMock = stub().returns({
  parse: stub().returns('test')
});
const loggerMock = {
  request: stub(),
  requestFail: stub(),
  requestSuccess: stub()
};

const UserHandler = proxyquire('../User', {
  '../config': {gitApi: {defaultLocation: 'test', minUsers: 'test'}},
  '../services': {UserService: UserServiceMock},
  '../entity': {User: UserMock},
  '../lib/logger': loggerMock
});

describe('UserHandler', function () {
  describe('getUsersByLocation', function () {
    let handler;

    beforeEach(function () {
      handler = new UserHandler();
      usersByLocationStub.resolves();
    });
    it('should send error if getUsersByLocation rejects', function () {
      usersByLocationStub.rejects(Error('test'));
      return handler.getUsersByLocation({ params: {}}, res)
        .then(() => {
          assert.calledWith(statusStub, 500);
          assert.calledWith(sendStub, 'test');
        });
    });
    it('should send success if getUsersByLocation resolves', function () {
      usersByLocationStub.resolves([{test: 'test'}]);
      return handler.getUsersByLocation({ params: {}}, res)
        .then(() => {
          assert.calledWith(statusStub, 200);
          assert.calledWith(sendStub, {users: ['test']});
        });
    });
    it('should send success if getUsersByLocation resolves ', function () {
      usersByLocationStub.resolves();
      return handler.getUsersByLocation({ params: {}}, res)
        .then(() => {
          assert.calledWith(statusStub, 200);
          assert.calledWith(sendStub, {users: []});
        });
    });
    it('should call logger with only location', function () {
      usersByLocationStub.resolves([{test: 'test'}]);
      return handler.getUsersByLocation({ params: {location: 'test'}}, res)
        .then(() => {
          assert.calledWith(loggerMock.request, '/location/test');
        });
    });
    it('should call logger with location and top', function () {
      usersByLocationStub.resolves([{test: 'test'}]);
      return handler.getUsersByLocation({ params: {location: 'test', top: 'test2'}}, res)
        .then(() => {
          assert.calledWith(loggerMock.request, '/location/test/top/test2');
        });
    });
  });
});
