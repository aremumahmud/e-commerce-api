const Paystack = require('../utils/paystack')

function initialize(email, amount, id, currency) {
    ////((Number(amount) * 100).toFixed(2))

    return typeof id === 'string' ?
        Paystack.transaction.initialize({
            email,
            amount: (Number(amount) * 100).toFixed(2),
            currency,
            metadata: {
                userId: id ? id : ""
            } // in kobo
        }).then(function(body) {
            // send the authorization_url in the response to the client to redirect them to
            // the payment page where they can make the payment
            return body
        }) : Paystack.transaction.initialize({
            email,
            amount: (Number(amount) * 100).toFixed(2),
            currency,
            metadata: {
                ...id
            } // in kobo
        }).then(function(body) {
            // send the authorization_url in the response to the client to redirect them to
            // the payment page where they can make the payment
            return body
        })
}

module.exports = initialize

/**
 * let d = {}
let f = {
    status: () => {
        //('duisjkh')
        return {
            json: () => {
                //(',msjshzn')
            }
        }
    }
}
initialize(d, f).then(d => {
    //(d)
})
 * 
 */