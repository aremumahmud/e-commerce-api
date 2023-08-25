const dbInstance = require("../db")

function modify(req, res) {

    let { _id, price, parentProduct, description, sizes, quantity, parent, weight, virtual_discount } = req.body

    let id = _id
    let parent_name = parentProduct
    let modified = {
            sizes,
            parentProduct,
            quantity,
            weight,
            virtual_discount
        }
        //(parent)
    let modified2 = {
            price,
            description,
            name: parentProduct,
            quantity,
            weight,
            virtual_discount
        }
        //  //(body)


    dbInstance.modifyProduct(id, parent, modified, modified2).then(resp => {
        //(resp)
        res.status(200).json({
            sucess: true,
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

module.exports = modify