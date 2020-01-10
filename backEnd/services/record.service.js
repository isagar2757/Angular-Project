const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Record = db.Record;

module.exports = {
    create,
    getAll,
    getById,
    getByPatientId,
    update,
    delete: _delete
};

async function create(newRecord) {

    const record = new Record(newRecord);

    // save user
    await record.save();
}

async function getAll() {
    return await Record.find().select('-hash');
}

async function getById(id) {
    return await Record.findById(id).select('-hash');
}

async function getByPatientId(id) {
    return await Record.find({ userId: id }).select('-hash');
}

async function update(id, record) {
    const dbrecord = await Record.findById(id);

    // validate
    if (!user) throw 'User not found';

    Object.assign(dbrecord, record);

    await dbrecord.save();
}

async function _delete(id) {
    await Record.findByIdAndRemove(id);
}