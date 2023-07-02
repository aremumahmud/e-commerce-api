const dbInstance = require("../db/exchange")

function modify_exchange(req, res) {

    let modified = req.body

    dbInstance.modifyExchange(modified).then(resp => {
      console.log(resp)
        res.status(200).json({
            success: true,
            error: false
        })
    }).catch(err => {
        console.log(err)
        res.status(400).json({
            success: false,
            error: true
        })
    })
}

module.exports = modify_exchange