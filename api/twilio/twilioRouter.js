require('dotenv').config();
const express = require('express');
const helpers = require('../../data/helpers/helperFunctions');
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);

const router = express.Router();

// pls send user id

router.post(`/`,  async (req, res) => {
    try {
        const user = await helpers.getUserById(req.body.id);

        if (user.length > 0) {
            try {
                const messages = await helpers.getMessages(req.body.id);

                if (messages.length > 0) {
                    const text = messages.map(message => (message.text));

                    let response = await client.messages.create({
                        body: `Hi, ${user[0].name}! Here are some cool things about yourself:\n ${text.join(', ')}`,
                        to: process.env.TESTPHONE2,  // Text this number
                        from: process.env.TWILIOPHONE // From a valid Twilio number
                        });

                    res.status(200).json({ message: `Message successfully sent!` });
                } else {
                    res.status(404).json({ error: `This user has no messages!` });
                }
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
})


module.exports = router;