const { Schema, default: mongoose } = require('mongoose');

const ShipmentModel = new Schema({
    local: { type: Number, default: 0 },
    international: { type: Number, default: 0 },

    Abia_State: { type: Number, default: 0 },
    Adamawa_State: { type: Number, default: 0 },
    Akwa_Ibom_State: { type: Number, default: 0 },
    Anambra_State: { type: Number, default: 0 },
    Bauchi_State: { type: Number, default: 0 },
    Bayelsa_State: { type: Number, default: 0 },
    Benue_State: { type: Number, default: 0 },
    Borno_State: { type: Number, default: 0 },
    Cross_River_State: { type: Number, default: 0 },
    Delta_State: { type: Number, default: 0 },
    Ebonyi_State: { type: Number, default: 0 },
    Edo_State: { type: Number, default: 0 },
    Ekiti_State: { type: Number, default: 0 },
    Enugu_State: { type: Number, default: 0 },
    Federal_Capital_Territory: { type: Number, default: 0 },
    Gombe_State: { type: Number, default: 0 },
    Imo_State: { type: Number, default: 0 },
    Jigawa_State: { type: Number, default: 0 },
    Kaduna_State: { type: Number, default: 0 },
    Kano_State: { type: Number, default: 0 },
    Katsina_State: { type: Number, default: 0 },
    Kebbi_State: { type: Number, default: 0 },
    Kogi_State: { type: Number, default: 0 },
    Kwara_State: { type: Number, default: 0 },
    Lagos_State: { type: Number, default: 0 },
    Nasarawa_State: { type: Number, default: 0 },
    Niger_State: { type: Number, default: 0 },
    Ogun_State: { type: Number, default: 0 },
    Ondo_State: { type: Number, default: 0 },
    Osun_State: { type: Number, default: 0 },
    Oyo_State: { type: Number, default: 0 },
    Plateau_State: { type: Number, default: 0 },
    Sokoto_State: { type: Number, default: 0 },
    Taraba_State: { type: Number, default: 0 },
    Yobe_State: { type: Number, default: 0 },
    Zamfara_State: { type: Number, default: 0 }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

module.exports = mongoose.model('Shipment', ShipmentModel)