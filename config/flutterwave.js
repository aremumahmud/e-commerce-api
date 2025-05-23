const axios = require('axios');
const generateTransactionReference = require('../utils/generate_tx_ref');

async function generatePaymentLink(amount, currency, customerEmail, customerName, id, role, discount) {
    const flutterwaveBaseUrl = 'https://api.flutterwave.com';
    const flutterwaveSecretKey = process.env.FLUTTERWAVE_SECRET_KEY;

    try {
        let tx_ref = generateTransactionReference()
        const response = await axios.post(
            `${flutterwaveBaseUrl}/v3/payments`, {
                amount,
                currency,
                redirect_url: 'https://e-commerce-api-jc2x.onrender.com/v1/api/pay/verify_payment',
                tx_ref,
                customer: {
                    email: customerEmail,
                    name: customerName,
                    user_id: id,
                    role
                },
                meta: {
                    user_id: id,
                    role,
                    discount,
                }
            }, {
                headers: {
                    Authorization: `Bearer ${flutterwaveSecretKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const { data } = response;
        if (data.status === 'success') {
            const { data: paymentData } = data;
            const paymentLink = paymentData.link;

            return {
                paymentLink,
                reference: tx_ref
            }
        } else {
            throw new Error('Failed to generate payment link');
        }
    } catch (error) {
        console.error('Error generating payment link:', error.message);
        throw error;
    }
}



module.exports = generatePaymentLink
    // const amount = 100; // Replace with the actual amount
    // const currency = 'NGN'; // Replace with the actual currency code
    // const redirectUrl = 'http://localhost:3000'; // Replace with your desired redirect URL
    // const customerEmail = 'customer@example.com'; // Replace with the customer's email
    // const customerName = 'John Doe'; // Replace with the customer's name

// generatePaymentLink(amount, currency, redirectUrl, customerEmail, customerName, 'dhukh73uhdxox')
//     .then(paymentLink => {
//         //('Payment Link:', paymentLink);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });