const express = require('express');
const router = express.Router();
const Alert = require('../models/Alert');
const { getExchangeRate } = require('../services/forexService');
const { sendSMS } = require('../services/smsService');

// This route will be triggered by Vercel Cron
router.get('/check', async (req, res) => {
    // Optional: Add a secret header check to prevent unauthorized calls
    // if (req.headers['authorization'] !== `Bearer ${process.env.CRON_SECRET}`) {
    //     return res.status(401).end('Unauthorized');
    // }

    console.log('Running scheduled rate check...');

    try {
        const activeAlerts = await Alert.find({ status: 'ACTIVE' });

        if (activeAlerts.length === 0) {
            console.log('No active alerts.');
            return res.json({ message: 'No active alerts checked' });
        }

        const alertsByPair = {};
        activeAlerts.forEach(alert => {
            if (!alertsByPair[alert.currencyPair]) {
                alertsByPair[alert.currencyPair] = [];
            }
            alertsByPair[alert.currencyPair].push(alert);
        });

        const results = [];

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

                    alert.status = 'TRIGGERED';
                    await alert.save();
                    results.push(`Triggered: ${alert._id} for ${alert.phoneNumber}`);
                }
            }
        }

        res.json({ message: 'Check complete', results });

    } catch (error) {
        console.error('Cron Job Error:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
