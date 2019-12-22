const Joi = require('joi');
const mongoose = require('mongoose');
require('mongoose-type-email');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
        min: 1,
        max: 60
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 50
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true,
        unique: true,
        min: 6,
        max: 60
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id,
        isAdmin: this.isAdmin
    }, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        login: Joi.string().min(1).max(60).required(),
        password: Joi.string().min(6).max(50).required(),
        email: Joi.string().min(6).max(60).required().email()
    };

    return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validate = validateUser;