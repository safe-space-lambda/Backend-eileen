require('dotenv').config();
const helpers = require('../../data/helpers/helperFunctions');
const crypto = require('crypto');
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);

const scheduler = async () => {
        try {
            const totalUsers = await helpers.getUsers();

            for (let i = 0; i < totalUsers.length; i++){
                try {
                    const user = await helpers.userByIdWithAllData(totalUsers[i].id);
        
                    if (user.length > 0) {
                        try {
                            const messages = await helpers.getMessages(i);
        
                            if (messages.length > 0 ) {
                                let decipher =  crypto.createDecipher(process.env.ALGO, Buffer.alloc(32), Buffer.alloc(16));
                                let decryptedPhone = decipher.update(user[0].phoneNumber, 'hex', 'utf8')
                                decryptedPhone += decipher.final('utf8');

                                const text = messages.map(message => (message.text));

                                let response = await client.messages.create({
                                    body: `Hi, ${user[0].name}! \nRemember, you are loved!\n Here are the best things about yourself:\n ${text.join(', ')}`,
                                    to: `+${decryptedPhone}`, // Text this number
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
}

module.exports = scheduler;