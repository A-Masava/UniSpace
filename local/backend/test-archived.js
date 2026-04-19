const mongoose = require('mongoose');
const { Classroom } = require('./src/models/Classroom');
require('dotenv').config({ path: './.env' });

mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log('connected');
    const dbRows = await Classroom.find({ archived: true });
    console.log('Archived classes:', dbRows);
    process.exit(0);
}).catch(console.error);
