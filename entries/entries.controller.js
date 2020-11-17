const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const entryService = require('./entry.service');


// routes
router.post('/create', createSchema, create);
router.get('/', authorize(), getAll);
router.get('/current', authorize(), getCurrent);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;





function createSchema(req, res, next) {
    const schema = Joi.object({
              
        animaltype:Joi.string().required(),
        name: Joi.string(),
        breed: Joi.number().required(),
        sex: Joi.number(),
        age: Joi.number(),
        microchip: Joi.boolean(),
        location: Joi.string().required(),
        castrated: Joi.boolean(),
        color: Joi.string().required(),
        height: Joi.number(),
        weight:Joi.number(),
        image1: Joi.any(),
        image2: Joi.any(),
        image3: Joi.any(),
        lastseen: Joi.date(),
        described: Joi.string()
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    entryService.create(req.body)
        .then(() => res.json({ message: 'Data entry successful' }))
        .catch(next);
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.user);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        
        animaltype:Joi.string().empty(''),
        name: Joi.string(),
        breed: Joi.number().empty(0),
        sex: Joi.number(),
        age: Joi.number(),
        microchip: Joi.boolean(),
        location: Joi.string().empty(''),
        castrated: Joi.boolean(),
        color: Joi.string().empty(''),
        height: Joi.number(),
        weight:Joi.number(),
        image1: Joi.any(),
        image2: Joi.any(),
        image3: Joi.any(),
        lastseen: Joi.date(),
        described: Joi.string()
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'Entry deleted successfully' }))
        .catch(next);
}