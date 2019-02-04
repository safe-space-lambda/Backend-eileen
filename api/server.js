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
});

server.post('/api/login', async (req, res) => {
    const creds = req.body;

    if (creds.username) {
        if (creds.password) {
            let response = await helpers.beginLogin(creds);

            if (!response || !bcrypt.compareSync(creds.password, response.password)) {
                res.status(401).json({ message: `Invalid username or password.` });
            } else {
                const token = helpers.generateToken(response);
                res.status(200).json(token);
            }
        } else {
            res.status(403).json({
                error: `Please include a password.`
            });
        }
    } else {
        res.status(403).json({
            error: `Please include a username.`
        })
    }
});

module.exports = server;