const config = require('config.json');
const mongoose = require('mongoose');
console.log(process.env.MONGODB_URI || config.connectionString)
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../models/user.model'),
    Record: require('../models/record.model'),
    Quote: require('../models/quote.model'),
    Notification: require('../models/notification.model')
};