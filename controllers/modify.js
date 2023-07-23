const dbInstance = require("../db")

function modify(req, res) {

    let { _id, price, parentProduct, description, sizes, quantity,parent } = req.body

    let id = _id
    let parent_name = parentProduct
    let modified = {
        sizes,
        parentProduct,
      quantity
    }
console.log(parent)
    let modified2 = {
            price,
            description,
            name: parentProduct,
            quantity
        }
        //  console.log(body)
 

    dbInstance.modifyProduct(id, parent, modified, modified2).then(resp => {
       console.log(resp)
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