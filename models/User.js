const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = mongoose.Schema({
    user: {
        type: String,
        unique: true,
        minLength: 5,
        maxLength: 20,
        lowercase: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        minLength: 5,
        maxLength: 50,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

userSchema.method('generateToken', async function(){
    let token = await jwt.sign({
        user: this.user,
        isAdmin: this.isAdmin
    }, config.get('jwtPrivateKey'));

    return token;
});

const User = new mongoose.model('User', userSchema);

function validateUser(user){
    const schema = Joi.object({
        user: Joi.string().min(5).max(20).required(),
        password: Joi.string().min(5).max(50).required(),
    });

    return schema.validate(user);
}

module.exports.User = User;
module.exports.validateUser = validateUser;