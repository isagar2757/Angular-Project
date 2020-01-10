const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    userId: {type: String, required: true},
    username: { type: String, required: true },
    pulseRate: { type: String, required: true },
    bloodPressure: { type: String, required: true },
    temprature: { type: String, required: true },
    weight: { type: String, required: true },
    comments: { type: String },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Record', schema);

// export class Record {
    // id: number;
    // userId: number;
    // username: string;
//     pulseRate: string;
//     bloodPressure: string;
//     temprature: string;
//     weight: string;
//     comments: string;
// }