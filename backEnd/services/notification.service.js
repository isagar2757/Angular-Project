const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Notification = db.Notification;

module.exports = {
    create,
    getAll,
    getById,
    getByPatientId,
    update,
    delete: _delete
};

async function create(newNotification) {

    const notification = new Notification(newNotification);

    // save notification
    await notification.save();
}

async function getAll() {
    return await Notification.find().select('-hash');
}

async function getById(id) {
    return await Notification.findById(id).select('-hash');
}

async function getByPatientId(id) {
    return await Notification.find({ userId: id }).select('-hash');
}

async function update(id, notification) {
    const dbNotification = await Notification.findById(id);

    Object.assign(dbNotification, notification);

    await dbNotification.save();
}

async function _delete(id) {
    await Notification.findByIdAndRemove(id);
}