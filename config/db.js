const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect('mongodb://camper:camper2020@ds233551.mlab.com:33551/devcamper-node', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    console.log(`Connected To mongoDB: ${conn.connection.host}`.cyan.underline.bold);
}

module.exports = connectDB;