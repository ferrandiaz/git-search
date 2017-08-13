'use strict';

const {server: { auth }} = require('../config');
const basicAuth = require('express-basic-auth');

const users = {};

users[auth.user] = auth.pass;

module.exports.auth = basicAuth({users});
