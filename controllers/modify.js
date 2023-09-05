const dbInstance = require("../db");

function modify(req, res) {
    let {
        _id,
        price,
        parentProduct,
        description,
        sizes,
        quantity,
        parent_id,
        weight,
        virtual_discount,
        USD,
        GBP,
        EUR,
        uploadType,
        category
    } = req.body;

    let id = _id;
    let parent_name = parentProduct;
    let modified = {
        sizes,
        parentProduct,
        quantity
    };
    //(parent)
    let modified2 = {
        price,
        description,
        name: parentProduct,
        quantity,
        weight,
        virtual_discount,
        USD,
        GBP,
        EUR,
        uploadType,
        category
    };
    //  //(body)

    dbInstance
        .modifyProduct(id, parent_id, modified, modified2)
        .then((resp) => {
            //(resp)
            res.status(200).json({
                sucess: true,
                error: false,
            });
        })
        .catch((err) => {
            //(err)
            res.status(400).json({
                success: false,
                error: true,
            });
        });
}

module.exports = modify;