require('dotenv').config();
const knex = require('knex');
const knexConfig = require('../../knexfile');
const jwt = require('jsonwebtoken');

const db = knex(knexConfig.development);

const getUsers = () => {
    return db('users');
}

const getUsersById = id => {
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

module.exports = {
    getUsers, 
    getUsersById, 
    generateToken, 
    beginLogin, 
    register,
}