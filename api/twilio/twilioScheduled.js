require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const helpers = require('../../data/helpers/helperFunctions');
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);
const decipher =  crypto.createDecipheriv(process.env.ALGO, Buffer.alloc(24), Buffer.alloc(16));

const scheduler = () => {
    return cron.schedule('0 8,17 * * *', async () => {
        try {
            const totalUsers = await helpers.getUsers();

            for (let i = 0; i < totalUsers.length; i++){
                try {
                    const user = await helpers.getUserById(totalUsers[i].id);
        
                    if (user.length > 0) {
                        try {
                            const messages = await helpers.getMessages(i);
        
                            if (messages.length > 0 ) {
                                const text = messages.map(message => (message.text));

                                let response = await client.messages.create({
                                    body: `Hi, ${user[0].name}! Here are some cool things about yourself:\n ${text.join(', ')}`,
                                    to: decipher.update(user[0].phoneNumber, 'hex', 'utf-8') || process.env.TESTPHONE2, // Text this number
                                    from: process.env.TWILIOPHONE // From a valid Twilio number
                                    });
                                console.log('message sent!')
                                } else {
                                    console.log('no messages found for this user, skipping....');
                                }// if message exists
                            } catch (err) {
                                console.log(err);
                            } //try getMessages
                            } else {
                                console.log('no user found for this id, skipping...');
                                continue;
                            }// if user exists
                        } catch (err) {
                            console.log(err);
                        }// try getUserById
                }// for loop
            } catch (err) {
                console.log(err)
            }// try getUsers
        })
    // await client.messages.create({
    //     body: `Test text!`,
    //     to: '+13476748038',  // Text this number
    //     from: process.env.TWILIOPHONE // From a valid Twilio number
    // });
        console.log('Cron is working as intended!');
}

module.exports = scheduler;