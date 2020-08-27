const mongoose = require('mongoose');
const Joi = require('joi');
const { commentSchema } = require('../models/Comment')

const questionSchema = new mongoose.Schema({
    questionTitle: {
        type: String,
        required: true,
        min: 5,
        max: 1000
    },
    questionBody: {
        type: String,
        min: 5,
        max: 5000
    },
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: false
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    numberOfComments: {
        type: Number,
        default: 0
    },
    commentsList: {
        type: [commentSchema]
    }
});

function validateQuestion(question) {
    const schema = Joi.object({
        questionTitle: Joi.string().min(5).max(1000).required(),
        questionBody: Joi.string().min(5).max(5000).required()
    });
    return schema.validate(question);
}

const Question = mongoose.model('Question', questionSchema);

module.exports.Question = Question;
module.exports.questionSchema = questionSchema;
module.exports.validateQuestion = validateQuestion;