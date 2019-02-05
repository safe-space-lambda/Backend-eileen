require('dotenv').config();
const knex = require('knex');
const knexConfig = require('../../knexfile');
const jwt = require('jsonwebtoken');

const db = knex(knexConfig.development);

const getUsers = () => {
    return db('users');
}

const getUserById = id => {
    return db('users').where({ id: id });
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

module.exports = {
    getUsers, 
    getUserById, 
    generateToken, 
    beginLogin, 
    register,
    updateUser,
    deleteUser
}