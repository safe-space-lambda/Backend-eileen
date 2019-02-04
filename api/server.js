const express = require('express');
const middleware = require('./config/middlewareConfig');
const bcrypt = require('bcryptjs');
const helpers = require('../data/helpers/helperFunctions');

const server = express();

middleware(server);

server.post('/api/register/', async (req, res) => {
    const userInfo = req.body;
    
    if (userInfo.password) {
        if (userInfo.username && userInfo.name) {
            userInfo.password = bcrypt.hashSync(userInfo.password, 16);
            
            try {
                const ids = await helpers.register(userInfo);

                res.status(201).json(ids);
            } catch (err) {
                res.status(403).json({ error: `Couldn't register this user. Please use a unique username.` })
            }
        } else {
            res.status(403).json({
                error: `Make sure to include a username and your name!`
            })
        }
    } else {
        res.status(403).json({
            error: `Please include a password for registration.`
        });
    }
})

module.exports = server;