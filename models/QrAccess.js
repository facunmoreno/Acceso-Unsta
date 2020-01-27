const mongoose = require('mongoose');
const { personSchema } = require('./Person');

const accessSchema = mongoose.Schema({
    person: personSchema,
    requestedDate: {
        type: Date,
        default: Date.now()
    },
    accessDate:{
        type: Date,
        required: false,
    },
    movement:{
        type: String,
        enum: ['Entrada', 'Salida'],
        required: true
    },
    status:{
        type: String,
        enum: ['ABIERTO', 'EXPIRADO', 'ACEPTADO'],
        default: 'ABIERTO'
    }
});

const QrAccess = mongoose.model('qr-access', accessSchema);

module.exports.QrAccess = QrAccess;