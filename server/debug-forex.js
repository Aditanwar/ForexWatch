require('dotenv').config();
const axios = require('axios');

const debugForex = async () => {
    const from = 'EUR';
    const to = 'USD';
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
    const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${to}&apikey=${apiKey}`;

    console.log(`Querying: ${url.replace(apiKey, 'HIDDEN_KEY')}`);

    try {
        const response = await axios.get(url);
        console.log('--- Full API Response ---');
        console.log(JSON.stringify(response.data, null, 2));
        console.log('-------------------------');
    } catch (error) {
        console.error('HTTP Error:', error.message);
    }
};

debugForex();
