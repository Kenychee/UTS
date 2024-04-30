const express = require('express');

const authentication = require('./components/authentication/authentication-route');
const users = require('./components/users/users-route');
const UTSDB = require('./components/UTS Digital Banking/UTS-route');

module.exports = () => {
  const app = express.Router();

  authentication(app);
  users(app);
  UTSDB(app);

  return app;
};
