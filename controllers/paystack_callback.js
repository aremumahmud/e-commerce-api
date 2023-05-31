const dbInstance = require("../db")

function verifyTransaction(req, res) {
    let id = req.query.reference
    if (!id) return res.status(400).json({
        message: 'cannot have an empty [id]'
    })
    dbInstance.validate_payment(id).then(response => {
        console.log(response, 'll')
        res.status(200).json(response)
    }).catch(err => {
        console.log(err, 'lk')
        res.status(404).json(err)
    })
}

module.exports = verifyTransaction