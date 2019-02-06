const express = require('express');
const middleware = require('./config/middlewareConfig');
const usersRouter = require('./users/usersRouter');
const messagesRouter = require('./messages/messagesRouter');
const twilioRouter = require('./twilio/twilioRouter');
const server = express();

middleware(server);

server.use('/api/', usersRouter);
server.use('/api/', messagesRouter);
server.use('/api/messages/send/', twilioRouter);

module.exports = server;