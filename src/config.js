'use strict';

const {
  DEFAUL_LOCATION,
  MIN_USERS,
  PAGE_SIZE,
  API_URL,
  PORT,
  AUTH_USER,
  TIMEOUT,
  PASSWORD
} = process.env;

module.exports = {
  gitApi: {
    defaultLocation: DEFAUL_LOCATION || 'Barcelona',
    minUsers: MIN_USERS || 1,
    pageSize: PAGE_SIZE || 100,
    url: API_URL || 'https://api.github.com',
    timeout: TIMEOUT || '5000',
    srt: 'repositories',
    order: 'desc'
  },
  server: {
    port: PORT || 1991,
    auth: {
      user: AUTH_USER,
      pass: PASSWORD
    }
  }
};
