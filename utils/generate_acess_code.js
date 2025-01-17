function generateAccessCode() {
    const min = 1000; // Minimum 6-digit number
    const max = 9999; // Maximum 6-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = generateAccessCode