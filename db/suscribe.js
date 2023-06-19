const suscribeModel = require("./Models/suscribe.Model")

class Suscribe {
    suscribe_user(email) {
        return new suscribeModel({
            user_email_address: email
        }).save()
    }
}


module.exports = new Suscribe