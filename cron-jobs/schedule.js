const fs = require('fs');
const cron = require('node-cron');
const axios = require('axios');
const { modifyExchange } = require('../db/exchange');

//const BASE_CURRENCY = 'USD';

// Function to fetch exchange rates and log them to a file
async function fetchAndLogExchangeRates() {
    try {
        const response = await axios.get(`https://api.fastforex.io/fetch-multi?from=NGN&to=EUR,GBP,USD&api_key=9be5082e66-fa5b37613f-rztafg`);
        // console.log(response)
        const exchangeRates = response.data.results;

        const timestamp = new Date().toISOString();

        const usdToNgnRate = (1 / exchangeRates.USD).toFixed(2)
        const gbpToNgnRate = (1 / exchangeRates.GBP).toFixed(2)
        const eurToNgnRate = (1 / exchangeRates.EUR).toFixed(2)

        // console.log(`1 GBP in NGN: ${gbpToNgnRate}`);
        // console.log(`1 EUR in NGN: ${eurToNgnRate}`);
        // console.log(`1 USD in NGN: ${usdToNgnRate}`);

        const modify = await modifyExchange({
                USD: usdToNgnRate,
                GBP: gbpToNgnRate,
                EUR: eurToNgnRate,
                NGN: 1
            })
            // console.log('jdjmk,')
        fs.appendFileSync('./exchange_rates.log', timestamp + JSON.stringify(modify))
    } catch (error) {
        // console.log('ff')
        const timestamp = new Date().toISOString();
        //console.log(error)
        fs.appendFileSync('./error.log', timestamp + JSON.stringify(error))
    }
}

// Schedule the cron job to run every 10 hours
cron.schedule('0 */1 * * *', () => {
   // console.log('Fetching and logging exchange rates...');
    fetchAndLogExchangeRates();
});
fetchAndLogExchangeRates();
// console.log('Exchange rate cron job started.');curl https://api.fastforex.io/fetch-multi?from=USD&to=EUR,GBP,CHF&api_key=YOUR_API_KEY