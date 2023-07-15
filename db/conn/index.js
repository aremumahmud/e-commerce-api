const URI = process.env.MONGOOSE_URI || 'mongodb://127.0.0.1:27017/testdb5'
const mongoose = require('mongoose')

mongoose.connect(URI)
    .then(function(err, res) {
        console.log('database connected ')

    }).catch(r => {
        console.log('database not connected ')
    })