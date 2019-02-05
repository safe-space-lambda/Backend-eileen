const express = require('express');
const helpers = require('../../data/helpers/helperFunctions');

const router = express.Router();

router.post('/users/:id/messages/', async (req, res) => {
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

router.get('/users/:id/messages/', async (req, res) => {
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

router.get('/messages/:id/', async (req, res) => {
    try {
        const response = await helpers.getMessageById(req.params.id);
        
        if (response.length > 0) {
            res.status(200).json(response);
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