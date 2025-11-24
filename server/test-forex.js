require('dotenv').config();
const { getExchangeRate } = require('./services/forexService');

const testForex = async () => {
    const from = 'USD';
    const to = 'EUR';
    console.log(`Fetching rate for ${from}/${to}...`);
    const rate = await getExchangeRate(from, to);
    if (rate) {
        console.log(`Current Rate: ${rate}`);
    } else {
        console.log('Failed to fetch rate.');
    }
};

testForex();
