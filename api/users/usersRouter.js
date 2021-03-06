require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const helpers = require('../../data/helpers/helperFunctions');
const restricted = require('../middleware/restricted');
const userRestriction = require('../middleware/restrictedByUser');

const router = express.Router();

router.post('/register/', async (req, res) => {
    const userInfo = req.body;
    const cipher = crypto.createCipher(process.env.ALGO, Buffer.alloc(32), Buffer.alloc(16));
    
    if (userInfo.password) {
        if (userInfo.username && userInfo.name) {
            if (userInfo.phoneNumber) {
                userInfo.password = bcrypt.hashSync(userInfo.password, 16);
                userInfo.phoneNumber = cipher.update(userInfo.phoneNumber, 'utf8', 'hex');
                userInfo.phoneNumber += cipher.final('hex');

                try {
                    const ids = await helpers.register(userInfo);
                    
                    res.status(201).json(ids);
                } catch (err) {
                    res.status(403).json({ error: `Couldn't register this user. Please use a unique username.` })
                }
            } else {
                res.status(403).json({
                    error: `Make sure to include a phone number!`
                })
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

router.post('/login/', async (req, res) => {
    const creds = req.body;

    if (creds.username) {
        if (creds.password) {
            try {
                let response = await helpers.beginLogin(creds);

                if (!bcrypt.compareSync(creds.password, response.password)) {
                    res.status(401).json({ message: `Invalid username or password.` });
                } else {
                    const token = helpers.generateToken(response);
                    res.status(200).json({ id: response.id, name: response.name, token: token });
                }
            } catch (err) {
                res.status(401).json({ message: `Invalid username or password.` });
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

router.get('/users/', restricted, async (req, res) => {
    try {
        let response = await helpers.getUsers();

        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({
            error: `Couldn't access user data. Please try again.`
        });
    }
});

router.get('/users/:id/', restricted, async (req, res) => {
    try {
        let response = await helpers.getUserById(req.params.id);
        
        if (response.length > 0) {
            res.status(200).json(response);
        } else {
            res.status(404).json({
                error: `Could not find specified user.`
            });
        }
    } catch (err) {
        res.status(500).json({
            error: `Couldn't access user data. Please try again.`
        });
    }
});

router.put('/users/:id/', userRestriction, async (req, res) => {
    try {
        let response = await helpers.updateUser(req.params.id, req.body);

        res.status(200).json(response);
    } catch (err) {
        res.status(404).json({
            error: `Could not find specified user.`
        });
    }
});

router.delete('/users/:id/', userRestriction, async(req, res) => {
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

module.exports = router;