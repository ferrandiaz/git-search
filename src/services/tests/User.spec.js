/* eslint-env mocha */
'use strict';

const proxyquire = require('proxyquire');
const chai = require('chai');
const { expect } = chai;
const { stub, assert } = require('sinon');

chai.use(require('chai-as-promised'));

let searchStub = stub();
let requestStub = stub();
let locationStub = stub().returns('test');
const GitApiMock = {
  search: searchStub
};
const utilsMock = {
  getRequestsOverPageSize: requestStub
};
const QueryMock = stub().returns({
  addLocation: locationStub
});

const UserService = proxyquire('../User', {
  '../config': { gitApi: { pageSize: 20, minUsers: 10}},
  '../api': { GitApi: GitApiMock },
  '../utils': {utils: utilsMock},
  '../entity': {Query: QueryMock}
});

describe('UserService', function () {
  const user = new UserService();

  describe('getUsersByLocation', function () {
    let resultSearch = { items: [{test: 'test'}]};

    beforeEach(function () {
      searchStub.resolves(resultSearch);
    });
    it('should call gitApi.search if size is bigger than the page_size', function () {

      return expect(user.getUsersByLocation('test')).to.become(resultSearch.items)
        .then(() => {
          assert.calledWith(QueryMock, {size: 10})
          assert.calledWith(locationStub, 'test')
          assert.calledOnce(searchStub);
          assert.notCalled(requestStub);
        });
    });
    it('should reject if gitApi.search rejects', function () {
      searchStub.rejects(Error('test'));
      return expect(user.getUsersByLocation('test')).to.be.rejected
        .then(error => {
          expect(error.message).to.equal('test');
        });
    });
    it('should call requestsOverPageSize if size > pageSize', function () {
      requestStub.returns([resultSearch, resultSearch]);

      return expect(user.getUsersByLocation('test', 100)).to.become([{test:'test'}, {test: 'test'}]);
    });
    it('should return an empty array if items are empty', function () {
      requestStub.returns([{},{}]);

      return expect(user.getUsersByLocation('test', 100)).to.become([]);
    });
  });
});
