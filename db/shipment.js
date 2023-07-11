const shipmentModel = require("./Models/shipment.Model");

class Shipment {
    updateShipment(shipment) {
        return shipmentModel.findOne().then(res => {
            if (!res) {
                //create an new object
                return new shipmentModel({...shipment }).save()

            }
            //else modify it
            res.local = shipment.local
            res.international = shipment.international
                //then return the results
            return res.save()
        })
    }

    getShipment() {
        return shipmentModel.findOne().then(res => {
            if (!res) {
                //create an new object
                return {
                    success: true,
                    shipments: {
                        local: 0,
                        international: 0
                    }
                }

            }

            return {
                success: true,
                shipments: res
            }
        })
    }
}

module.exports = new Shipment()