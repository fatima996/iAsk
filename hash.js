const bycrpt = require('bcrypt');

async function run() {
    const salt = await bycrpt.genSalt(10);
    const hashed = await bycrpt.hash('1234', salt);
    console.log(salt);
    console.log(hashed);
    
}
run();