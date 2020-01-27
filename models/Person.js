const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const schema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 255,
        required: true,
    },
    code: {
        type: String,
        maxLength: 255,
        required: true,
    },
    type: {
        type: String,
        enum: ['Alumno', 'Profesor'],
        required: true,
    }
});

function validatePerson(person){
    let schema = Joi.object({
        name: Joi.string().max(255).required(),
        code: Joi.string().max(255).required()
    });

    return schema.validate(person);
}

module.exports.personSchema = schema;
module.exports.validatePerson = validatePerson;