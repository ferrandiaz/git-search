'use strict';

const express = require('express');
const { UserHandler } = require('../handler');

let router = express.Router();
let handler = new UserHandler();

router
  .route('/location/:location/top/:top')
  .get(handler.getUsersByLocation);

router
  .route('/location/:location')
  .get(handler.getUsersByLocation);


module.exports = router;
