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
                            price_in_naira: doc.USD,
                        },
                        GBP: {
                            symbol: "£",
                            price_in_naira: doc.GBP,
                        },
                        NGN: {
                            symbol: "₦",
                            price_in_naira: doc.NGN,
                        },
                        EUR: {
                            symbol: "€",
                            price_in_naira: doc.EUR,
                        },
                    },
                    symbolTab: { "₦": doc.NGN, "€": doc.EUR, $: doc.USD, "£": doc.GBP },
                });
            });
        });
    }

    modifyExchange(modified) {

        return exchangeModel.findOneAndUpdate({}, modified)
    }
}

module.exports = new Exchange()