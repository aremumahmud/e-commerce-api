function generateTransactionReference() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let txRef = '';

    // Generate a random alphanumeric string of length 10
    for (let i = 0; i < 30; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        txRef += chars.charAt(randomIndex);
    }

    // Append a timestamp to the transaction reference
    const timestamp = new Date().getTime();
    txRef += `_${timestamp}`;

    return txRef;
}



module.exports = generateTransactionReference