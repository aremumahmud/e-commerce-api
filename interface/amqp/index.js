const amqp_interface = require('./amqp.interface')

const app = new amqp_interface(['Orders', 'Error'])


app.setupChannel().then(() => {
    console.log('amqp interface successfully connected')
})


module.exports = app