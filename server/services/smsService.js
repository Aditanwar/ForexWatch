const twilio = require('twilio');

const sendSMS = async (to, message) => {
    try {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const fromNumber = process.env.TWILIO_PHONE_NUMBER;

        if (!accountSid || !authToken || !fromNumber) {
            console.warn('Twilio credentials missing. SMS not sent.');
            return;
        }

        const client = twilio(accountSid, authToken);

        await client.messages.create({
            body: message,
            from: fromNumber,
            to: to
        });
        console.log(`SMS sent to ${to}`);
    } catch (error) {
        console.error('Error sending SMS:', error.message);
    }
};

module.exports = { sendSMS };
