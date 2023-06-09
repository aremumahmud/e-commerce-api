const dbInstance = require("../db")

function modify(req, res) {

    let { _id, price, parentProduct, description, sizes, quantity } = req.body

    let id = _id
    let parent = parentProduct
    let modified = {
        sizes,
        parentProduct
    }

    let modified2 = {
            price,
            description,
            name: parentProduct,
            quantity
        }
        //  console.log(body)

    dbInstance.modifyProduct(id, parent, modified, modified2).then(resp => {
        res.status(200).json({
            sucess: true,
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

module.exports = modify