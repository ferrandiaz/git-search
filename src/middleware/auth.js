'use strict';

const {server: { auth }} = require('../config');
const basicAuth = require('express-basic-auth');

function authorizer (username, pass, cb) {
  if(auth.user && auth.pass){
    if(auth.user === username && auth.pass === pass) return cb(null, true);
    else  return cb(null, false);
  } else {
    return cb(null, true);
  }
};

module.exports.auth = basicAuth({authorizer: authorizer, authorizeAsync: true});
