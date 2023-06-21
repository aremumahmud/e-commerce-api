const axios = require('axios');

async function verifyTransaction1(transactionId) {
    const flutterwaveBaseUrl = 'https://api.flutterwave.com';
    const flutterwaveSecretKey = 'FLWSECK_TEST-b81ca4ff99a748e2decef914748f98f5-X';

    try {
        const response = await axios.get(
            `${flutterwaveBaseUrl}/v3/transactions/${transactionId}/verify`, {
                headers: {
                    Authorization: `Bearer ${flutterwaveSecretKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const { data } = response;
        if (data.status === 'success') {
            // Transaction verification successful
            const transactionData = data.data;

            // You can perform further actions or retrieve specific information from transactionData

            return transactionData;
        } else {
            throw new Error('Transaction verification failed');
        }
    } catch (error) {
        console.error('Error verifying transaction:', error.message);
        //  throw error;
    }
}

// const transactionId = '4411404'; // Replace with the actual transaction ID

// verifyTransaction1(transactionId)
//     .then(transactionData => {
//         console.log('Transaction Verified:', transactionData);
//         // Perform further actions or retrieve specific information from transactionData
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });


module.exports = verifyTransaction1