const URI = process.env.MONGOOSE_URI || 'mongodb+srv://aremumahmud:aremu2003@cluster0.imbxhgs.mongodb.net/?retryWrites=true&w=majority'
const mongoose = require('mongoose')

mongoose.connect(URI)
    .then(function (err, res) {
        console.log('database connected ')

    }).catch(r => {
        console.log('database not connected ')
    })