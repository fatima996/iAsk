const Joi = require('joi');
const bycrpt = require('bcrypt');
const _ = require('lodash')
const { User } = require('../models/User');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0]);
    console.log(req.body)
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ message: 'Invalid email password.' });

    const validPasword = await bycrpt.compare(req.body.password, user.password);
    if (!validPasword) return res.status(400).send({ message: 'Invalid email password.' });
    //if faills the user is still created
    const token = user.generateAuthToken();

    res.send({token: token});
});

function validate(user) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(user);
}
module.exports = router;