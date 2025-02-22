const dbInstance = require("../db")
const sendmail = require("../utils/sendmail")

function verifyTransaction(req, res) {

    let id = req.query.transaction_id

    if (!id) return res.redirect('unique_collections://malformed')
    dbInstance.validate_payment(id).then(response => {
        console.log(response.resp1, 'll')
        sendmail(response.email_address, response.resp1, response.discount)
        sendmail('aremumahmud2003@gmail.com', response.resp1, response.discount)
        res.redirect('unique_collections://success')
    }).catch(err => {
        //(err, 'lk')
        res.redirect('unique_collections://failed')
    })
}

module.exports = verifyTransaction