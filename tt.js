const fs = require('fs');
const cron = require('node-cron');
const axios = require('axios');

const API_KEY = '96e843faa36d4980ad0c05ff4c0f2b71'; // Replace with your API key
const BASE_CURRENCY = 'USD';

// Function to fetch exchange rates and log them to a file
async function fetchAndLogExchangeRates() {
    try {
        const response = await axios.get(`https://openexchangerates.org/api/latest.json?app_id=${API_KEY}&base=${BASE_CURRENCY}&symbols=NGN,GBP,EUR`);
        const exchangeRates = response.data.rates;
        const timestamp = new Date().toISOString();

        const usdToNgnRate = exchangeRates.NGN
        const usdToGbpRate = exchangeRates.GBP
        const usdToEurRate = exchangeRates.EUR

        const gbpToNgnRate = usdToNgnRate / usdToGbpRate;
        const eurToNgnRate = usdToNgnRate / usdToEurRate;

        console.log(`1 GBP in NGN: ${gbpToNgnRate}`);
        console.log(`1 EUR in NGN: ${eurToNgnRate}`);

        const logMessage = `${timestamp}: ${BASE_CURRENCY} to USD: ${exchangeRates.NGN}, ${BASE_CURRENCY} to GBP: ${exchangeRates.GBP}, ${BASE_CURRENCY} to EUR: ${exchangeRates.EUR}\n`;

        fs.appendFile('exchange_rates.log', logMessage, (err) => {
            if (err) {
                console.error('Error writing to log file:', err);
            } else {
                console.log('Exchange rates logged successfully.');
            }
        });
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
    }
}

// Schedule the cron job to run every 10 hours
cron.schedule('0 */10 * * *', () => {
    console.log('Fetching and logging exchange rates...');
    fetchAndLogExchangeRates();
});
fetchAndLogExchangeRates();
console.log('Exchange rate cron job started.');