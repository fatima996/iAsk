const router = require('express').Router();
const { User } = require('../models/User');
const _ = require('lodash')
const auth = require('../middleware/auth');
const { validateQuestion, Question } = require('../models/Question')
const { Comment } = require('../models/Comment');
const { result } = require('lodash');

router.post('/', auth, async (req, res) => {
    let user = await User.findOne({ _id: req.userId });
    if (!user) return res.status(404).send({ message: 'User not found' });

    const { validQuestion } = validateQuestion(req.body);
    if (validQuestion) return res.status(400).send({ message: validQuestion.details[0].message });

    let question = new Question({
        questionTitle: req.body.questionTitle,
        questionBody: req.body.questionBody,
        userId: user._id,
        userName: user.name
    });
    await question.save();

    res.send(_.pick(question, ['questionTitle', 'questionBody', 'userId', 'userName', 'dateCreated', 'commentList', '_id', 'isFavourite']));
});

router.get('/:start/:end', auth, async (req, res) => {
    const { start, end } = req.params;
    let question = await Question.find({}).skip(Number(start)).limit(Number(end));

    res.send((question));
});


router.get('/myQuestions/:start/:end', auth, async (req, res) => {
    const { start, end } = req.params;
    let question = await Question.find({ userId: req.userId }).skip(Number(start)).limit(Number(end));

    res.send((question));
});

router.get('/:questionId', auth, async (req, res) => {

    let question = await Question.findOne({ _id: req.params.questionId });
    if (!question) res.status(404).send({ message: 'Question not found' });

    let comments = await Comment.find({ questionId: req.params.questionId });
    if (comments) question.commentsList = comments
    res.send(question);
});

router.post('/search', auth, async (req, res) => {
    let result = await Question.find({ "questionTitle": { "$regex": req.body.query, "$options": "i" } });
    res.send(result);
});


router.delete('/:questionId', auth, async (req, res) => {

    let question = await Question.findOne({ _id: req.params.questionId });
    if (!question) res.status(404).send({ message: 'Question not found' });

    let user = await User.findOne({ _id: req.userId });
    if (!user) res.status(404).send({ message: 'User not found' });
    if (question.userId !== req.userId) res.status(400).send({ message: 'Can not delete the question!' });

    result = await Question.findOneAndDelete({ _id: req.params.questionId });
    console.log(result);

    if (result) await Comment.deleteMany({ questionId: req.params.questionId })


    res.send(question);
});



module.exports = router;