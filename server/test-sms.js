require('dotenv').config();
const { sendSMS } = require('./services/smsService');

const testSMS = async () => {
    const to = process.argv[2];
    if (!to) {
        console.log('Usage: node test-sms.js <phone_number>');
        process.exit(1);
    }
    console.log(`Sending test SMS to ${to}...`);
    await sendSMS(to, 'This is a test message from ForexWatch.');
};

testSMS();
