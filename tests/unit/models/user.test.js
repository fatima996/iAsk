require('../../../startup/config')
const { User } = require('../../../models/User');
const JWT = require('jsonwebtoken');
const mongoose = require('mongoose');
require('../../../jest.config')

describe('user.generateAuthToken', () => {
    it('should return a valid JWT', () => {
        const payload = { _id: new mongoose.Types.ObjectId().toHexString() };
        const user = new User(payload);
        const token = user.generateAuthToken();
        const decode = JWT.verify(token, process.env.JWT);
        expect(decode).toMatchObject(payload);
    })
})