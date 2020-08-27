const request = require('supertest');
const { Question } = require('../../models/Question')
const { User } = require('../../models/User')
let server;

describe('/api/questions', () => {
    beforeEach(() => { server = require('../../index'); })
    afterEach(() => {
        server.close();
        Question.remove();
    });

    describe('GET / ', () => {
        it('should return status 401 if not logged in', async () => {
            const res = await request(server).get('/api/questions/1/5');
            expect(res.status).toBe(401);
        });
    });

    // // describe('GET / ', () => {
    // //     it('should return all questions with pagination specified', async () => {
    // //         await Question.insertMany([
    // //             { questionTitle: "heloo there my name is Fatima" },
    // //             { questionTitle: "heloo there my name is Vehid", questionBody: "Vehid Trtak" }
    // //         ])
    // //         const res = await request(server).get('/api/questions/1/5');
    // //         expect(res.status).toBe(401);
    // //     });
    // // });

    // describe('POST / ', () => {
    //     it('should return status 401 if not aurhorized', async () => {
    //         const res = await request(server)
    //             .post('/api/questions')
    //             .send({ questionTitle: "heloo there my name is Vehid", questionBody: "Vehid Trtak" });
    //         expect(res.status).toBe(401);
    //     });  
        
    //     it('should return status 400 if not aurhorized', async () => {
    //         const token = new User().generateAuthToken();
    //         console.log(token);
    //         const res = await request(server)
    //             .post('/api/questions')
    //             .set('x-auth-token', token)
    //             .send({ questionTitle: "", questionBody: "Vehid Trtak" });
    //         expect(res.status).toBe(400);
    //     });
    });
});