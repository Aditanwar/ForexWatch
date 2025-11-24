require('dotenv').config();
const mongoose = require('mongoose');
const Alert = require('./models/Alert');

const checkAlerts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const alerts = await Alert.find({});
        console.log('COUNT:', alerts.length);
        alerts.forEach((a, i) => {
            console.log(`[${i}] Pair: '${a.currencyPair}'`);
        });
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkAlerts();
