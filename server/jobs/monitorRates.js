const cron = require('node-cron');
const Alert = require('../models/Alert');
const { getExchangeRate } = require('../services/forexService');
const { sendSMS } = require('../services/smsService');

const startMonitoring = () => {
    // Run every 5 minutes
    cron.schedule('*/5 * * * *', async () => {
        console.log('Running rate check job...');

        try {
            // Find all active alerts
            const activeAlerts = await Alert.find({ status: 'ACTIVE' });

            if (activeAlerts.length === 0) {
                console.log('No active alerts to check.');
                return;
            }

            // Group by currency pair to minimize API calls
            // Map: "EUR/USD" -> [Alert1, Alert2]
            const alertsByPair = {};
            activeAlerts.forEach(alert => {
                if (!alertsByPair[alert.currencyPair]) {
                    alertsByPair[alert.currencyPair] = [];
                }
                alertsByPair[alert.currencyPair].push(alert);
            });

            // Check rates for each pair
            for (const pairStr of Object.keys(alertsByPair)) {
                const [from, to] = pairStr.split('/');
                const currentRate = await getExchangeRate(from, to);

                if (currentRate === null) continue;

                const alerts = alertsByPair[pairStr];
                for (const alert of alerts) {
                    let triggered = false;
                    if (alert.condition === 'ABOVE' && currentRate > alert.targetRate) {
                        triggered = true;
                    } else if (alert.condition === 'BELOW' && currentRate < alert.targetRate) {
                        triggered = true;
                    }

                    if (triggered) {
                        const message = `ForexWatch Alert: ${pairStr} is now ${currentRate} (${alert.condition} ${alert.targetRate}).`;
                        await sendSMS(alert.phoneNumber, message);

                        // Update alert status to TRIGGERED so it doesn't fire again
                        alert.status = 'TRIGGERED';
                        await alert.save();
                        console.log(`Alert triggered for ${alert.phoneNumber}`);
                    }
                }
            }
        } catch (error) {
            console.error('Error in monitoring job:', error);
        }
    });
};

module.exports = { startMonitoring };
