const axios = require('axios');

const getExchangeRate = async (fromCurrency, toCurrency) => {
    try {
        const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
        const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=${apiKey}`;

        const response = await axios.get(url);

        // Alpha Vantage response structure
        const data = response.data['Realtime Currency Exchange Rate'];
        if (!data) {
            // Check for rate limit message or other errors
            if (response.data['Note']) {
                throw new Error(`Alpha Vantage Rate Limit: ${response.data['Note']}`);
            }
            if (response.data['Error Message']) {
                throw new Error(`Alpha Vantage Error: ${response.data['Error Message']}`);
            }
            console.log('Unexpected API Response:', JSON.stringify(response.data));
            throw new Error(`No data returned for ${fromCurrency}/${toCurrency}`);
        }

        const rate = parseFloat(data['5. Exchange Rate']);
        return rate;
    } catch (error) {
        console.error('Error fetching exchange rate:', error.message);
        return null;
    }
};

module.exports = { getExchangeRate };
