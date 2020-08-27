const mongoose = require('mongoose');
const Joi = require('joi');

const commentSchema = new mongoose.Schema({
    commentBody: {
        type: String,
        required: true,
        min: 5,
        max: 5000
    },
    questionId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    userName: {
        type:String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

function validateComment(comment) {
    const schema = Joi.object({
        commentBody: Joi.string().min(5).max(50).required()
    });
    return schema.validate(comment);
}

const Comment = mongoose.model('Comment', commentSchema);

module.exports.Comment = Comment;
module.exports.commentSchema = commentSchema;
module.exports.validateComment = validateComment;