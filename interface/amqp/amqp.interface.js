/**
 * @description aqmpq class for simplifying message transmission
 * @param {  Array } queues - Array of Queues to be consumed from
 * @returns { Promise } - returns a promise which resolves a channel
 */

const amqp = require('amqplib/callback_api');
const fs = require('fs')


const CONN_URL = process.env.AMQP_CONN_URI || 'amqp://guest:guest@127.0.0.1:5672/';
/**
 * @description - a class for  setting up the rabbtMQ and managing errors
 * @param { Array } queues - array containing queues to assert from
 * @param { String } offlineWrite -a string that defines the file path for local queues
 */

class Rabbit {
    constructor(queues, offlineWrite = 'queue.offline.json') {
        this.channel = null
        this.connected = false
        this.queues = queues
        this.offlineQueue = []
        this.offline = false
        this.offlineWrite = offlineWrite
        this.write = false

        this.loadOfflineQueue().then(res => {
            this.offlineQueue.push.apply(this.offlineQueue, res.queue)
                //console.log(this.offlineQueue, res)
            console.log('sucessfully merged queues')
        }).catch(err => {
            console.log('no queue in file proceeding to setup')
        })

        //on process exit we want to store the file and close our rabbitmq channel
        // process.on('exit', () => {
        //         this.storeCahedQueue()
        //         this.channel && this.channel.close()
        //     })
        process.on('uncaughtException', (e) => {
            console.log(e)
            this.storeCahedQueue()
            this.channel && this.channel.close()
            process.exit()
        })

        process.on('SIGINT', () => {
            this.storeCahedQueue()
            this.channel && this.channel.close()
            process.exit()
        })
    }



    /**
     * @description - set up function to connect rabbitMQ
     * @returns { Promise }
     */


    setupChannel(params) {
        // console.log('me 1')
        return new Promise((resolve, reject) => { // return a promise to handle results flexibly
            !this.connected ? //if system or amqp is not conneted we try to connect and resolve the channel
                //we start a connecion 
                amqp.connect(params.uri || CONN_URL, (err, conn) => {

                    //if an error occurs we want to retry the connection and 
                    // clear the Timeouts to prevent memory leaks
                    //then we resolve its connecting
                    if (err) {

                        //we set the offline prop to true to indicate that the system tried
                        //connecting but failed

                        this.offline = true

                        //then we write a timeout 
                        let timeout = setTimeout(() => {
                            this.setupChannel()
                            console.log('spandem')
                            clearTimeout(timeout)
                        }, 10000)
                        return resolve({
                            msg: 'reconnecting',
                            error: true,
                            //so when amqp is offline we want to just store it temporarily
                            //and should flush it when he amqp server comes back online
                            sendToQueue: (queue, data) => {
                                this.offlineQueue.push([queue, data])
                            }
                        })
                    }



                    //then we create a channel and assert all the queues we want to
                    // send messages to
                    conn.createChannel((err, channel) => {
                        this.queues.forEach(queue => {
                            channel.assertQueue(queue, {
                                durable: true
                            });

                        });
                        //set this.channel to the connectio  channel and resolve it
                        this.channel = channel;
                        //here we set the connection to true and flush the offline queue if neccesary
                        this.connected = true
                        console.log(this.offlineQueue.length, '')
                        this.offlineQueue.length > 0 && this.flushOfflineQueue()
                        console.log('connection established')
                        resolve(this.channel)
                    });
                }) : resolve(this.channel)
        })

    }

    /**
     * @description - sends data/message to the queue for processing
     * @param { String } queueName - the name of the queue we are pushing to
     * @param { Object|Array } data - the datab structure holding the data to be sent the queue
     * @returns { Promise }
     * 
     */
    async publishToQueue(queueName, data) {
        //   console.log(queueName, data)
        // first we check
        // if the service is online an if it is
        if (this.offline) {
            // we want to create an IIFE to push all offline messages to th offline queue
            return ((q, d) => {
                this.offlineQueue.push([q, d])
                return true
            })(queueName, data)
        }
        //console.log(this.channel)
        let channel = !this.connected ? await this.setupChannel() : this.channel
            // let channel =
            //     set:
            //     this.channel

        // we then send to queue

        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), { persistent: true })

    }


    /**
     * @description - a method that flushes the queue once online
     * @returns { Promise }
     */

    async flushOfflineQueue() {
        // if the queue is empty we return
        console.log(this.offlineQueue.length, 'rr')

        if (this.offlineQueue.length === 0) return
            // console.log(this.offlineQueue.length, 'ee')
            //else we define an error array for storing unsuccessful writes
        let errors = []
        let clone = [...this.offlineQueue]
        clone.forEach(async message => {
                //if the return of each write is false we want to push that same message to the queue
                this.offlineQueue.shift() // start to remove the messages in a lifo structure
                let sucess = await this.publishToQueue(message[0], message[1]);
                !sucess && errors.push(message)
            })
            //finally we want to bind it back to the queue

        this.offlineQueue.push.apply([], errors)
    }


    /**
     * 
     * @description - for Storing cached queues when system was down or array was destroyed
     * @returns { void } - returns null
     * 
     */
    storeCahedQueue() {
        if (this.write) return

        // if the queue is empty we dont want to write to any queue
        // to avoid reading from the buffer and hinder performance
        // if (this.offlineQueue.length <= 0) {
        //     console.log('system crashing ......')
        //     console.log(`starting offline Queue Write to ${this.offlineWrite} `)
        //     console.log('Queue write failed ')
        //     console.log(`reason : Queue to be read from was fucking empty `)
        //     return
        // }
        // else we want to write to the file Synchronously to preserve order 
        //since our app is crashing out
        console.log('system crashing ......')
        console.log(`starting offline Queue Write to ${this.offlineWrite} `)
        fs.writeFileSync(
            this.offlineWrite,
            JSON.stringify(this.offlineQueue)
        )
        this.write = true
        console.log(`successfully stored queue in ${this.offlineWrite}`)
    }


    /**
     * @description - for populating the offline queue from the offline store when its back online
     * @returns { promise }
     */

    loadOfflineQueue() {
        return new Promise((resolve, reject) => {
            //read the file if there was a file populate to existing queue else not
            fs.readFile(this.offlineWrite, (err, res) => {
                //console.log(res)
                err ? reject({
                    error: true,
                    queue: null
                }) : resolve({
                    error: false,
                    queue: JSON.parse(res.toString())
                })
            })
        })
    }
}


module.exports = Rabbit