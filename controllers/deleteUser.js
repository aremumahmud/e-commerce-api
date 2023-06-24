//database controller
const dbInstance = require('../db/user')

function delete_user(req, res) {
    let id = req.user._id
    dbInstance.delete_user(id)
        .then((deletedDocument) => {
            if (deletedDocument) {
                return res.status(200).json({
                    success: true,
                    error: false,
                    message: 'Deleted account successfully'

                })
            }
            res.status(200).json({
                success: true,
                error: false,
                message: 'user not found'

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


module.exports = delete_user