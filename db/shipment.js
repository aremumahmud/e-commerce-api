const shipmentModel = require("./Models/shipment.Model");

class Shipment {
    /**
     * The function `updateShipment` updates an existing shipment object with new local and
     * international values, or creates a new shipment object if one does not already exist.
     * @param shipment - The `shipment` parameter is an object that contains the details of a shipment.
     * It may have the following properties:
     * @returns a promise that resolves to the updated shipment object.
     */
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

    /* The `getShipment()` function retrieves the details of a shipment object. It uses the
    `shipmentModel.findOne()` method to find the first shipment object in the database. */
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