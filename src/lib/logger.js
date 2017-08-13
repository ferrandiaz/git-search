'use strict';

function log(text, color, icon) {
  const pattern = ' ########################';

  console.log(color, pattern); // eslint-disable-line no-console
  console.log(color, `${icon} ${text}\x1b[0m`); // eslint-disable-line no-console
  console.log(color, pattern); // eslint-disable-line no-console
}

function loggerInfo(text, color, icon) {
  console.log(color, `${icon}  info  |  ${text}\x1b[0m`); // eslint-disable-line no-console
}

function loggerRequest(text, color, icon, state) {
  if (icon && state !== 'REQUEST') console.log(color, `${icon} ${state}!: ${text}\x1b[0m`); // eslint-disable-line no-console
  else console.log(color, `${icon}  Request  |  ${text}\x1b[0m`); // eslint-disable-line no-console
}

function success(text) {
  log(text, '\x1b[32m', '✔');
}

function error(text) {
  log(text, '\x1b[31m', '✗');
}
function info(text) {
  loggerInfo(text, '\x1b[36m', 'ⓘ');
}
function infoError(text) {
  loggerInfo(text, '\x1b[31m', '✗ ');
}
function request(text) {
  loggerRequest(text, '\x1b[33m', '»', 'REQUEST');
}
function requestSuccess(text) {
  loggerRequest(text, '\x1b[32m', '✔', 'SUCCESS');
}
function requestFail(text) {
  loggerRequest(text, '\x1b[31m', '✗', 'FAIL');
}
module.exports = {
  success,
  error,
  info,
  request,
  requestSuccess,
  requestFail,
  infoError
};
