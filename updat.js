require("./db/conn")


const OrderModel = require("./db/Models/order.Model")

OrderModel.updateMany({}, {
    "$set": {
        status: 'processing'
    }
}).then(e => {
    console.log('done')
})