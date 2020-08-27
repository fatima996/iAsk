const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6,
        unique: true
    },
    password: {
        type: String,
        required: true,
        max: 1204,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
});

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(user);
}

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT);
    return token;
}


getUserId = function (token) {
    const decode = jwt.verify(token, process.env.JWT);
    return decode._id;

}

const User = mongoose.model('User', userSchema);

module.exports.User = User;
module.exports.getUserId = getUserId;
module.exports.userSchema = userSchema;
module.exports.validateUser = validateUser;