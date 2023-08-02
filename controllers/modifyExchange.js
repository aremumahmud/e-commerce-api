const dbInstance = require("../db/exchange")

function modify_exchange(req, res) {

    let modified = req.body

    dbInstance.modifyExchange(modified).then(resp => {
        //(resp)
        res.status(200).json({
            success: true,
            error: false
        })
    }).catch(err => {
        //(err)
        res.status(400).json({
            success: false,
            error: true
        })
    })
}

module.exports = modify_exchange