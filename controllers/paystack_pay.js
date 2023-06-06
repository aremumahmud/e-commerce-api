const Paystack = require('../utils/paystack')

function initialize(email, amount, id, currency) {
  //console.log((Number(amount) * 100).toFixed(2))
    return Paystack.transaction.initialize({
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
    })
}

module.exports = initialize

/**
 * let d = {}
let f = {
    status: () => {
        console.log('duisjkh')
        return {
            json: () => {
                console.log(',msjshzn')
            }
        }
    }
}
initialize(d, f).then(d => {
    console.log(d)
})
 * 
 */