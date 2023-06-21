const currencyTab = {
    USD: {
        symbol: '$',
        price_in_naira: 460
    },
    GBP: {
        symbol: '£',
        price_in_naira: 560
    },
    NGN: {
        symbol: '₦',
        price_in_naira: 1
    },
    EUR: {
        symbol: '€',
        price_in_naira: 500
    }
}

const symbolTab = { '₦': 1, '€': 500, '$': 460, '£': 560 }
const nameTab = { '₦': 'NGN', '€': 'EUR', '$': 'USD', '£': 'GBP' }

module.exports = { symbolTab, nameTab, currencyTab }