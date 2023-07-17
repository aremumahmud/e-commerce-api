const { create_discount } = require("../db/discount")

//const { create_discount } = require("./g");

function createDiscount(req, res) {

    let value = parseInt(req.body.value)
    let lifespan = parseInt(req.body.lifespan) || 1
    if (!value) return res.status(400).json({
        error: true,
        message: 'cannot accept null values'
    })

    create_discount(value, lifespan).then((response) => {
        res.status(200).json({
            ...response,
            success: true,
            error: false
        })
    }).catch(err => {
        res.status(400).json(err)
    })
}

module.exports = createDiscount