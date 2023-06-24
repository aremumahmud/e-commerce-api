//database controller
const dbInstance = require('../db')

function delete_product(req, res) {
    let id = req.body.id
    dbInstance.deleteProduct(id)
        .then((deletedDocument) => {
            if (deletedDocument) {
                return res.status(200).json({
                    success: true,
                    error: false,
                    message: 'Deleted product successfully'

                })
            }
            res.status(200).json({
                success: true,
                error: false,
                message: 'product not found'

            })
        })
        .catch((error) => {
            res.status(200).json({
                success: false,
                error: true,
                message: 'Delete operation failed'

            })
        });
}


module.exports = delete_product