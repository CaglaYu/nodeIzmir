const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll() {
    return await db.Entry.findAll();
}

async function getById(id) {
    return await getEntry(id);
}

async function create(params) {
    // validate
    if (await db.Entry.findOne({ where: { username: params.username } })) {
        throw 'Entryname "' + params.username + '" is already taken';
    }


    // save user
    await db.Entry.create(params);
}

async function update(id, params) {
    const user = await getEntry(id);

    // validate
    const usernameChanged = params.username && user.username !== params.username;
    if (usernameChanged && await db.Entry.findOne({ where: { username: params.username } })) {
        throw 'Entryname "' + params.username + '" is already taken';
    }

    

    // copy params to user and save
    Object.assign(user, params);
    await user.save();

    return user.get();
}

async function _delete(id) {
    const user = await getEntry(id);
    await user.destroy();
}

// helper functions

async function getEntry(id) {
    const user = await db.Entry.findByPk(id);
    if (!user) throw 'Entry not found';
    return user;
}
