const server = require('./api/server');
const runScheduledTexts = require('./api/twilio/twilioScheduled');

runScheduledTexts();

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\nServer running on port ${port}\n`));