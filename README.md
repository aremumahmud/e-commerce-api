# Amqp interface

this light-weight module helps in handling and managing amqp message dispatch to employ an error free solution

## Usage

```javascript

const amqpInterface = require('amqp-interface')
//this class will take an argument of arrays containing 
//the queues to be asserted 
let queue_names = ['Social', 'Error']
const app = new amqpInterface([...queue_names])

//if the connection string is not passed to the function 

//setup an ENV variable called AMQP_CONN_URI
//or it would default to 'amqp://guest:guest@127.0.0.1:5672/'

//or add it as the first argument as such

let overrideURI = {
    uri: process.env.WHATEVER_AMQP_URI_STRING
}

app.setupChannel(overrideURI)
    .then(res=>{
        console.log('Interface Setup is complete!!')
    })
    .catch(err=>{
        console.log('Error occured but you can still continue publishing your messages they wont get lost !!')
    })

 
```

## Now to publish to the queue 
Here where the magic happens. if there is an error, the interface will continue trying to reconnect to the amqp server while recieving these messages on the queue, dangerous aproach right, dont worry the interfaces got you covered. When there is a crash, the queue is automatically saved to a file called `queue.offline.json` and is completely merged if the application is restarted and the amqp server is still down and flushed immediately if the amqp server is up and running again

```javascript
//publishing to a queue named Social as defined in Class above 
//with the messages ===> { helo: 'spansdem' }
 app.publishToQueue('Social', { helo: 'spansdem' })

```