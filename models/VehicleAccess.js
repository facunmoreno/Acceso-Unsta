const mongoose = require('mongoose');
const { patenteSchema } = require('./Patente');
const Joi = require('@hapi/joi');

const accessSchema = mongoose.Schema({
    patente: {
        type: patenteSchema,
        required: false
    },
    registro:{
        type: String,
        maxLength: 255,
        required: false,
    },
    accessDate: {
        type: Date,
        default: Date.now()
    },
    movement: {
        type: String,
        enum: ['Entrada', 'Salida'],
        required: true
    },
    status:{
        type: String,
        enum: ['ACEPTADO', 'DENEGADO'],
        required: true,
    }
});

const VehicleAccess = mongoose.model('Vehicle-Access', accessSchema);

function validateAccess(access) {
    const schema = Joi.object({
        registro: Joi.string().max(255).required(),
        movement: Joi.string().valid('Entrada', 'Salida').required()
    });

    return schema.validate(access);
}

module.exports.VehicleAccess = VehicleAccess;
module.exports.validateAccess = validateAccess;