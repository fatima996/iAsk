const router = require('express').Router();
const { User, validateUser } = require('../models/User');
const bycrpt = require('bcrypt');
const _ = require('lodash')

router.post('/register', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message});

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send({ message: 'User already registered.'});

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bycrpt.genSalt(10);
    user.password = await bycrpt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuthToken();

    res.header('Authorization', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;