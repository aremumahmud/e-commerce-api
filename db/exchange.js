const exchangeModel = require("./Models/exchange.Model");

class Exchange {
    getExchange() {
        return new Promise((resolve, reject) => {
            exchangeModel.findOne().then((doc) => {
                resolve({
                    raw: doc,
                    currencyTab: {
                        USD: {
                            symbol: "$",
                            price_in_naira: doc?.USD || 1200,
                        },
                        GBP: {
                            symbol: "£",
                            price_in_naira: doc?.GBP || 2000,
                        },
                        NGN: {
                            symbol: "₦",
                            price_in_naira: doc?.NGN || 1,
                        },
                        EUR: {
                            symbol: "€",
                            price_in_naira: doc?.EUR || 1600,
                        },
                    },
                    symbolTab: { "₦": doc?.NGN || 1, "€": doc?.EUR || 1600, $: doc?.USD || 1200, "£": doc?.GBP || 2000 },
                });
            });
        });
    }

    modifyExchange(modified) {

        return exchangeModel.findOneAndUpdate({}, modified)
    }
}

module.exports = new Exchange()
