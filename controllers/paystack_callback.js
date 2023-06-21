const dbInstance = require("../db")
const sendmail = require("../utils/sendmail")

function verifyTransaction(req, res) {

    let id = req.query.transaction_id

    if (!id) return res.status(400).json({
        message: 'cannot have an empty [id]'
    })
    dbInstance.validate_payment(id).then(response => {
        console.log(response, 'll')
        sendmail(response.email_address, response.id, 'https://e-commerce-api.aremzy.repl.co/v1/api/fetch_order_view?id=')
        res.redirect('https://e-commerce-ui-ruddy.vercel.app/success')
    }).catch(err => {
        console.log(err, 'lk')
        res.redirect('https://e-commerce-ui-ruddy.vercel.app/home')
    })
}

module.exports = verifyTransaction