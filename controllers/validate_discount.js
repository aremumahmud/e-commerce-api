//const { verify_discount } = require("./g");

const { verify_discount } = require("../db/discount")

function validateDiscount(req, res) {

    let value = req.query.discount_code

    if (!value) return res.status(400).json({
        error: true,
        message: 'cannot accept null values'
    })
    verify_discount(value).then((response) => {
        res.status(200).json(response)
    }).catch(err => {
        res.status(400).json(err)
    })
}

module.exports = validateDiscount