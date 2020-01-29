const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { personSchema } = require('./Person');

const patenteSchema = mongoose.Schema({
    registro: {
        type: String,
        maxLength: 9,
        minLength: 7,
        unique: true,
        required: true
    },
    person: personSchema
});

patenteSchema.static('validarFormato', function(patente) {
    if(patente.length == 7 && validarPatenteVieja(patente)){
        return true;
    }
    if(patente.length == 9 && validarPatenteNueva(patente)){
        return true;
    }
    return false;
});

patenteSchema.static('validarCantidad', async function (person) {
    let patentes = await Patente.find({ person: person }).countDocuments();

    if(patentes >= 5 ){
        return false;
    }

    return true;
})

const Patente = mongoose.model('Patente', patenteSchema);

function validatePatente(patente){
    const schema = Joi.object({
        registro: Joi.string().min(7).max(9).required(),
        name: Joi.string().max(255).required(),
        code: Joi.string().max(255).required(),
        type: Joi.string().valid('Alumno', 'Profesor').required()
    });

    return schema.validate(patente);
}


function validarPatenteVieja (patente){
    if(isLetter(patente[0]) && isLetter(patente[1]) && isLetter(patente[2]) && (patente[3] == ' ')
        && isNumeric(patente[4]) && isNumeric(patente[5]) && isNumeric(patente[6]) ){
        return true;
    }
    return false;
}

function validarPatenteNueva (patente) {
    if(isLetter(patente[0]) && isLetter(patente[1]) && (patente[2] == ' ')
        && isNumeric(patente[3]) && isNumeric(patente[4]) && isNumeric(patente[5]) && (patente[6] == ' ')
        && isLetter(patente[7]) && isLetter(patente[8])){
        return true;
    }
    return false;
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function isLetter(n) {
    return n.match("^[A-Za-z]");
}

module.exports.Patente = Patente;
module.exports.validatePatente = validatePatente;