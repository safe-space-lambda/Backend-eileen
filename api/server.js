const express = require('express');
const middleware = require('./config/middlewareConfig');
const usersRouter = require('./users/usersRouter');
const messagesRouter = require('./messages/messagesRouter');

const server = express();

middleware(server);

server.use('/api/', usersRouter);

module.exports = server;