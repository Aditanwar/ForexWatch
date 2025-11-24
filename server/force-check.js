require('dotenv').config();
const mongoose = require('mongoose');
const { startMonitoring } = require('./jobs/monitorRates');
const Alert = require('./models/Alert');
const { getExchangeRate } = require('./services/forexService');
const { sendSMS } = require('./services/smsService');

// We need to extract the logic from startMonitoring or just copy it here for a single run.
// Since startMonitoring uses cron, we can't just call it to run *once* immediately.
// I will copy the logic for a single execution here.

const runCheckNow = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        console.log('Running immediate rate check...');

        // Find all active alerts
        const activeAlerts = await Alert.find({ status: 'ACTIVE' });

        if (activeAlerts.length === 0) {
            console.log('No active alerts to check.');
        } else {
            console.log(`Found ${activeAlerts.length} active alerts.`);

            // Group by currency pair
            const alertsByPair = {};
            activeAlerts.forEach(alert => {
                if (!alertsByPair[alert.currencyPair]) {
                    alertsByPair[alert.currencyPair] = [];
                }
                alertsByPair[alert.currencyPair].push(alert);
            });

            // Check rates
            for (const pairStr of Object.keys(alertsByPair)) {
                const [from, to] = pairStr.split('/');
                console.log(`Checking rate for ${pairStr}...`);
                const currentRate = await getExchangeRate(from, to);

                if (currentRate === null) {
                    console.log(`Failed to fetch rate for ${pairStr}`);
                    continue;
                }

                console.log(`Current rate for ${pairStr} is ${currentRate}`);

                const alerts = alertsByPair[pairStr];
                for (const alert of alerts) {
                    let triggered = false;
                    if (alert.condition === 'ABOVE' && currentRate > alert.targetRate) {
                        triggered = true;
                    } else if (alert.condition === 'BELOW' && currentRate < alert.targetRate) {
                        triggered = true;
                    }

                    if (triggered) {
                        console.log(`>>> TRIGGERING ALERT for ${alert.phoneNumber}: ${alert.condition} ${alert.targetRate}`);
                        const message = `ForexWatch Alert: ${pairStr} is now ${currentRate} (${alert.condition} ${alert.targetRate}).`;
                        await sendSMS(alert.phoneNumber, message);

                        alert.status = 'TRIGGERED';
                        await alert.save();
                        console.log('Alert status updated to TRIGGERED.');
                    } else {
                        console.log(`Alert for ${alert.phoneNumber} not triggered (Target: ${alert.targetRate}, Condition: ${alert.condition})`);
                    }
                }
            }
        }

        console.log('Check complete.');
        process.exit(0);

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

runCheckNow();
