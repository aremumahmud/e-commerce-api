const jwt = require('jsonwebtoken')
const JWT_PRIVATE_KEY = process.env.JWT_SECRET;

//helper 
let passAndNext = (req, id, next) => {
    req.user = {
        _id: id
    }
    next()
}

//auth middle ware to validate and authorize requests
function Auth(req, res, next) {
    //get the token

    let token = req.headers.authorization && req.headers.authorization.split(' ')[1]
        //console.log(req.headers, token)
        //then verify
    jwt.verify(token, JWT_PRIVATE_KEY, function(err, decoded) {

        // console.log(decoded, err)
        //if error or decoded is undefined we reject and send an error message
        err || !decoded ? res.status(400).json({
            error: true,
            authorized: false,
            msg: 'user not authorized to perform this action'
        }) : decoded.role === 'customer' ? passAndNext(req, decoded.id, next) : res.status(400).json({
            error: true,
            authorized: false,
            msg: 'user not authorized to perform this action'
        })
    });
}

module.exports = Auth