const express = require('express');
const router = express.Router();
const quoteService = require('../services/quote.service');

// routes
router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);
router.get('/patient/:userId', getByPatientId);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function create(req, res, next) {
    quoteService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    quoteService.getAll()
        .then(records => res.json(records))
        .catch(err => next(err));
}

function getById(req, res, next) {
    quoteService.getById(req.params.id)
        .then(record => record ? res.json(record) : res.sendStatus(404))
        .catch(err => next(err));
}

function getByPatientId(req, res, next) {
    quoteService.getByPatientId(req.params.userId)
        .then(records => res.json(records[0]))
        .catch(err => next(err));
}

function update(req, res, next) {
    quoteService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    quoteService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}