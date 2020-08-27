const dotenv = require('dotenv');
dotenv.config();

process.env.JWT = process.env.NODE_ENV === 'dev' ? process.env['JWT_DEV']: process.env['JWT_TEST']
process.env.DB = process.env.NODE_ENV === 'dev' ? process.env['DB_CONNECT_DEV']: process.env['DB_CONNECT_TEST']

module.exports = function () {
    if (!process.env.JWT) {
        console.error('FATAL ERROR: jwtPrivateKey is not defined.');
        process.exit(1);
    }
}