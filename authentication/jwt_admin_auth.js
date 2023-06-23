const jwt = require('jsonwebtoken')
const JWT_PRIVATE_KEY = process.env.JWT_SECRET || 'fjvghbftygbv hb,k kj';

//helper 
let passAndNext = (req, dec, next) => {
    req.user = {
        _id: dec.id,
        username: dec.username,
        email_address: dec.email_address
    }
    next()
}

//auth middle ware to validate and authorize requests
function Auth_Admin(req, res, next) {
    //get the token

    let token = req.headers.authentication && req.headers.authentication.split(' ')[1]
        //console.log(token)
        //then verify
    jwt.verify(token, JWT_PRIVATE_KEY, function(err, decoded) {

        console.log(decoded, err)
        //if error or decoded is undefined we reject and send an error message
        err || !decoded ? res.status(400).json({
            error: true,
            login: false,
            authorized: 'none',
            msg: 'user not authorized to perform this action'
        }) : decoded.role === 'admin' ? passAndNext(req, decoded, next) : res.status(400).json({
            error: true,
            login: false,
            authorized: 'none',
            msg: 'user not authorized to perform this action'
        })
    });
}

module.exports = Auth_Admin