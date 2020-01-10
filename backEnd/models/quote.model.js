const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    userId: {type: String, required: true},
    username: { type: String, required: true },
    quote: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Quote', schema);
