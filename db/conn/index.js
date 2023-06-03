const URI = process.env.MONGOOSE_URI || 'd'
const mongoose = require('mongoose')

mongoose.connect(URI)
    .then(function(err, res) {
        console.log('database connected ')

    }).catch(r => {
        console.log('database not connected ')
    })