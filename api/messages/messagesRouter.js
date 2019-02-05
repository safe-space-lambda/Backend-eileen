const express = require('express');
const helpers = require('../../data/helpers/helperFunctions');
const restrictedByUser = require('../middleware/restrictedByUser');
const restricted = require('../middleware/restricted');
const router = express.Router();

router.post('/users/:id/messages/', restrictedByUser, async (req, res) => {
    if (req.body.text && req.body.text.length > 0) {
        try {
            const user = await helpers.getUserById(req.params.id);
            
            if (user.length > 0) {
                try {
                    const newMessage = { user_id: req.params.id, ...req.body };
                    const response = await helpers.createMessage(newMessage);
                    
                    res.status(201).json(response);
                } catch (err) {
                    res.status(500).json({
                        error: `Could not create message at this time.`
                    });
                }
            } else {
                res.status(404).json({
                    error: `Could not find specified user.`
                });
            }
        } catch (err) {
            res.status(500).json({
                error: `Could not access users at this time.`
            });
        }
    } else {
        console.log(req.body);
        res.status(403).json({
            error: `Please include some text in your message!`
        });
    }
});

router.get('/users/:id/messages/', restrictedByUser, async (req, res) => {
    try {
        const user = await helpers.getUserById(req.params.id);
        
        if (user.length > 0) {
            try {
               const response = await helpers.getMessages(req.params.id);

               res.status(200).json(response);
            } catch (err) {
                res.status(500).json({
                    error: `Could not get messages at this time.`
                });
            }
        } else {
            res.status(404).json({
                error: `Could not find specified user.`
            });
        }
    } catch (err) {
        res.status(500).json({
            error: `Could not access users at this time.`
        });
    }
});

router.get('/messages/:id/', restricted, async (req, res) => {
    try {
        const response = await helpers.getMessageById(req.params.id);

        if (response.length > 0) {
            if (req.decodedToken.userId.toString() === response[0].user_id.toString()) {
                res.status(200).json({ id: response[0].id, text: response[0].text });
            } else {
                res.status(403).json({
                    error: `You are not allowed to see these messages!`
                });
            }
        } else {
            res.status(404).json({
                error: `Couldn't find a message with that Id!`
            });
        }
    } catch (err) {
        res.status(500).json({
            error: `Could not get messages at this time.`
        });
    }
});

router.put('/messages/:id/', restricted, async (req, res) => {
    if (req.body.text && req.body.text.length > 0) {       

        try {
            const messageExists = await helpers.getMessageById(req.params.id);

            if (messageExists.length > 0) {
                if (req.decodedToken.userId.toString() === messageExists[0].user_id.toString()) {
                    try {
                        const response = await helpers.updateMessage(req.params.id, req.body);
                        
                        if (response !== 0) {
                            res.status(200).json(response);
                        } else {
                            res.status(404).json({
                                error: `Couldn't find a message with that Id!`
                            });
                        }
                    } catch (err) {
                        res.status(500).json({
                            error: `Could not update messages at this time.`
                        });
                    }
                } else {
                    res.status(403).json({
                        error: `You are not allowed to see these messages!`
                    });
                }
            } else {
                res.status(404).json({
                    error: `Couldn't find a message with that Id!`
                });
            }
        } catch (err) {
            res.status(500).json({
                error: `Could not get messages at this time.`
            });
        }
    } else {
        res.status(500).json({
            error: `Please include some text in your message!`
        })
    }
});

router.delete('/messages/:id/', restricted, async (req, res) => {
    try {
        const messageExists = await helpers.getMessageById(req.params.id);

        if (messageExists.length > 0) {
            if (req.decodedToken.userId.toString() === messageExists[0].user_id.toString()) {
                try {
                    const response = await helpers.deleteMessage(req.params.id);
                    if (response !== 0){
                        res.status(200).json(response);

                    } else {
                        res.status(404).json({
                            error: `Couldn't find a message with that Id!`
                        });
                    }
                } catch (err) {
                    res.status(500).json({
                        error: `Can't delete data at this time.`
                    });
                }
            } else {
                res.status(403).json({
                    error: `You are not allowed to see these messages!`
                });
            }
        } else {
            res.status(404).json({
                error: `Couldn't find a message with that Id!`
            });
        }
    } catch (err) {
        res.status(500).json({
            error: `Could not get messages at this time.`
        });
    }
})
    
module.exports = router;