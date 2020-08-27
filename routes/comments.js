const router = require('express').Router();
const mongoose = require('mongoose');
const Fawn = require('fawn');
const _ = require('lodash')

const auth = require('../middleware/auth');

const { validateComment, Comment } = require('../models/Comment');
const { Question } = require('../models/Question');
const { User } = require('../models/User');


Fawn.init(mongoose);


router.post('/', auth, async (req, res) => {
    console.log(req.body)
    let user = await User.findOne({ _id: req.userId });
    if (!user) return res.status(404).send({ message: 'User not found' });

    let question = await Question.findOne({ _id: req.body.questionId });
    if (!question) res.status(404).send({ message: 'Question not found' });

    const { validComment } = await validateComment(req.body);
    if (validComment) return res.status(400).send({ message: validComment.details[0].message });

    let comment = new Comment({
        commentBody: req.body.commentBody,
        questionId: req.body.questionId,
        userId: req.userId,
        userName: user.name
    });
    try {
        new Fawn.Task()
            .save('comments', comment)
            .update('questions', { _id: question._id }, 
            { $inc: { numberOfComments: 1 }}
            ).run();
        res.send(_.pick(comment, ['commentBody', 'questionId', 'userId', 'userName', 'dateCreated', '_id', 'numberOfComments']));
    }
    catch (ex) {
        res.status(500).send('Something failed.');
    }

});


module.exports = router;