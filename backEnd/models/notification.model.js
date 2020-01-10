const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    userId: {type: String, required: true},
    username: { type: String, required: true },
    tel: { type: String, required: true },
    alert: { type: String, required: true },
    resolved: { type: Boolean, default: false },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Notification', schema);
