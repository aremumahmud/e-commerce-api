/**
 * @desc  
 * @param { Object } req - http request object
 * @param { Object } res - http response object
 * @package -dbInstance
 */

//database controller
const dbInstance = require('../db/suscribe')
const sendmail_suscribe = require('../utils/suscribeMail')

function suscribe_user(req, res) {
    ////(req.body, req.query)
    const { email } = req.query

    dbInstance.suscribe_user(email).then(response => {
        sendmail_suscribe(email)
        res.status(200).json({
            success: true,
            data: response
        })
    }).catch(err => {
        res.status(400).json({
            message: 'there was an unexpected turn of events',
            success: false,
            error: true
        })
    })
}

module.exports = suscribe_user