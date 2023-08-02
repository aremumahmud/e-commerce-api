const dbInstance = require("../db/shipment")

function modify_shipment(req, res) {

    let modified = req.body

    dbInstance.updateShipment(modified).then(resp => {
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

module.exports = modify_shipment