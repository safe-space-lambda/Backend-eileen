const express = require('express');
const middleware = require('./config/middlewareConfig');
const bcrypt = require('bcryptjs');

const server = express();

middleware(server);

module.exports = server;