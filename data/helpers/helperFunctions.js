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
        .del();
}

const createMessage = message => {
    return db('messages').insert(message);
}

const getMessages = id => {
    return db('messages')
        .where({ 'user_id': id })
        .select('id', 'text');
}

const getMessageById = id => {
    return db('messages')
        .where({ id: id });
}

const updateMessage = (id, updatedInfo) => {
    return db('messages')
        .where({ id: id })
        .first()
        .update(updatedInfo);
}

const deleteMessage = id => {
    return db('messages')
        .where({ id: id })
        .first()
        .del();
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
    getMessages,
    getMessageById,
    updateMessage,
    deleteMessage,
}