'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { server } = require('./config');
const routes = require('./routes');
const app = express();
const logger = require('./lib/logger');
const { auth } = require('./middleware');

app.use(auth);

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('git-search is running');
});

routes.forEach(route => {
  app.use('/user', route);
});

exports.start = () => {

  app.listen(server.port, () => {
    logger.success(`git-search running on port ${server.port}`);
  });

};

exports.app = app;
