const setUp = require('./amqp.interface')
const app = new setUp(['setre'])


app.setupChannel().then(ee => {
    console.log('hello connection')
})
console.log('jj')
    // setInterval(() => {
    //     app.publishToQueue('setre', { helo: 'spansdem' })
    // }, 4000);

console.log('jjk')