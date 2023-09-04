const dbInstance = require("../db")
const sendmail = require("../utils/sendmail")

function verifyTransaction(req, res) {

    let id = req.query.transaction_id

    if (!id) return res.redirect('https://e-commerce-ui-ruddy.vercel.app/home')
    dbInstance.validate_payment(id).then(response => {
        console.log(response.resp1, 'll')
        sendmail(response.email_address, response.resp1, response.discount)
        res.redirect('https://e-commerce-ui-ruddy.vercel.app/success')
    }).catch(err => {
        //(err, 'lk')
        res.redirect('https://e-commerce-ui-ruddy.vercel.app/home')
    })
}

module.exports = verifyTransaction