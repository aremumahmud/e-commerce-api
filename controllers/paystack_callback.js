const dbInstance = require("../db")

function verifyTransaction(req, res) {
    let id = req.query.reference
    if (!id) return res.status(400).json({
        message: 'cannot have an empty [id]'
    })
    dbInstance.validate_payment(id).then(response => {
        console.log(response, 'll')
        res.redirect('https://e-commerce-ui-ruddy.vercel.app/success')
    }).catch(err => {
        console.log(err, 'lk')
        res.redirect('https://e-commerce-ui-ruddy.vercel.app/home')
    })
}

module.exports = verifyTransaction