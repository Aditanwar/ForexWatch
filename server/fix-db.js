require('dotenv').config();
const mongoose = require('mongoose');
const Alert = require('./models/Alert');

const fixDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const res = await Alert.deleteMany({ currencyPair: 'RUP/USD' });
        console.log('Deleted count:', res.deletedCount);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

fixDb();
