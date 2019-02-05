require('dotenv').config();
const knex = require('knex');
const knexConfig = require('../../knexfile');
const jwt = require('jsonwebtoken');

const db = knex(knexConfig.development);

const getUsers = () => {
    return db('users').select('id', 'username', 'name');
}

const getUserById = id => {
    return db('users').where({ id: id }).select('id', 'username', 'name');
}

const beginLogin = creds => {
    return db('users').where({ 'username': creds.username }).first();
}

const register = userInfo => {
    return db('users').insert(userInfo);
}

const generateToken = user => {
    const payload = {
        userId: user.id,
        name: user.name,
    };

    const secret = process.env.JWT_SECRET;

    const options = {
        expiresIn: '120m',
    }

    return jwt.sign(payload, secret, options);
}

const updateUser = (userId, userInfo) => {
    return db('users')
        .where({id: userId})
        .first()
        .update(userInfo);
}

const deleteUser = userId => {
    return db('users')
        .where({ id: userId })
        .first()
        .delete(userId);
}

const createMessage = message => {
    return db('messages').insert(message);
}

module.exports = {
    getUsers, 
    getUserById, 
    generateToken, 
    beginLogin, 
    register,
    updateUser,
    deleteUser,
    createMessage,
}