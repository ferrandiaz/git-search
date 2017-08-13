'use strict';

const { gitApi: { defaultLocation, minUsers }} = require('../config');
const { UserService } = require('../services');
const { User } = require('../entity');
const logger = require('../lib/logger');

class UserHandler {
  getUsersByLocation({ params }, res) {
    loggerRequest(params);
    const {
      location = defaultLocation,
      top = minUsers
    } = params;

    return new UserService()
      .getUsersByLocation(location, top)
      .then(parseUsers)
      .then(result => success(res, result))
      .catch(err => error(res, err));
  }
}

module.exports = UserHandler;

const parseUsers = (users = []) => {
  return users.map(user => new User(user).parse());
};

const success = (res, users) => {
  logger.requestSuccess('');
  res.status(200).send({users});
};

const error = (res, {code = 500, message}) => {
  logger.requestFail('');
  res.status(code).send(message);
};

const loggerRequest = ({location, top}) => {
  const locationString = `/location/${location}`;

  if(location && top) logger.request(`${locationString}/top/${top}`);
  else if(location) logger.request(locationString);
};
