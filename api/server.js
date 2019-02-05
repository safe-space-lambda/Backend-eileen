const express = require('express');
const middleware = require('./config/middlewareConfig');
const bcrypt = require('bcryptjs');
const helpers = require('../data/helpers/helperFunctions');
const restricted = require('./middleware/restricted');
const restrictedByUser = require('./middleware/restrictedByUser');

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
            try {
                let response = await helpers.beginLogin(creds);

                if (!bcrypt.compareSync(creds.password, response.password)) {
                    res.status(401).json({ message: `Invalid username or password.` });
                } else {
                    const token = helpers.generateToken(response);
                    res.status(200).json(token);
                }
            } catch (err) {
                res.status(500).json({
                    error: `Couldn't log in. Please try again.`
                });
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

server.get('/api/users/', restricted, async (req, res) => {
    try {
        let response = await helpers.getUsers();

        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({
            error: `Couldn't access user data. Please try again.`
        });
    }
});

server.get('/api/users/:id', restricted, async (req, res) => {
    try {
        let response = await helpers.getUserById(req.params.id);

        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({
            error: `Couldn't access user data. Please try again.`
        });
    }
});

server.put('/api/users/:id', restrictedByUser, async (req, res) => {
    try {
        let response = await helpers.updateUser(req.params.id, req.body);

        res.status(200).json(response);
    } catch (err) {
        res.status(404).json({
            error: `Could not find specified user.`
        });
    }
});

server.delete('/api/users/:id', restrictedByUser, async(req, res) => {
    try {
        let response = await helpers.deleteUser(req.params.id);
        
        req.decodedToken = null;
        res.status(200).json(response);
    } catch (err) {
        res.status(404).json({
            error: `Could not find specified user.`
        });
    }
})

module.exports = server;