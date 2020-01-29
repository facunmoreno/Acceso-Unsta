const mongoose = require('mongoose');
const { personSchema } = require('./Person');
const qr_code = require('qrcode');
const Joi = require('@hapi/joi');

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
        required: false
    },
    status:{
        type: String,
        enum: ['ABIERTO', 'EXPIRADO', 'ACEPTADO'],
        default: 'ABIERTO'
    }
});

accessSchema.method('generateQR', async function(){
    let qr = await qr_code.toDataURL(String(this._id));
    return qr;
});

accessSchema.method('setExpirationTime', function(mls = 300000) {
    setTimeout(() => {
        if(this.status == 'ABIERTO') {
            this.status = 'EXPIRADO';
            this.save();
        }
    }, mls);
});

accessSchema.static('validateQR', async function(req) {
    if(!mongoose.Types.ObjectId.isValid(req.body.qr)){
        return false;
    }

    let qr_access = await QrAccess.findOne({ _id: req.body.qr });
    if(!qr_access) return false;
    
    if(qr_access.status != 'ABIERTO') return false;

    qr_access.status = 'ACEPTADO';
    qr_access.accessDate = Date.now();
    qr_access.movement = req.body.movement;
    qr_access.save();

    return true;
});

const QrAccess = mongoose.model('qr-access', accessSchema);

function validateQR(req){
    const schema = Joi.object({
        qr: Joi.string().max(255).required(),
        movement: Joi.string().valid('Entrada', 'Salida').required()
    });

    return schema.validate(req);
}

module.exports.QrAccess = QrAccess;
module.exports.validateQR = validateQR;