const mongoose = require('mongoose');
require('dotenv').config()

module.exports = function () {
    mongoose.connect(process.env.DB,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        }
    ).catch(err => console.error('Could not connect to MongoDB...' + err));
}