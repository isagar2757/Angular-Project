const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Quote = db.Quote;

module.exports = {
    create,
    getAll,
    getById,
    getByPatientId,
    update,
    delete: _delete
};

async function create(newQuote) {

    const quote = new Quote(newQuote);

    // save quote
    await quote.save();
}

async function getAll() {
    return await Quote.find().select('-hash');
}

async function getById(id) {
    return await Quote.findById(id).select('-hash');
}

async function getByPatientId(id) {
    return await Quote.find({ userId: id }).sort({ createdDate: 1 }).limit(1).select('-hash');
}

async function update(id, quote) {
    const dbquote = await Quote.findById(id);

    Object.assign(dbquote, quote);

    await dbquote.save();
}

async function _delete(id) {
    await Quote.findByIdAndRemove(id);
}