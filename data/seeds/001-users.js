require('dotenv').config();
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const cipher =  crypto.createCipher(process.env.ALGO, Buffer.alloc(24), Buffer.alloc(16));

let testphone1 = cipher.update(process.env.TESTPHONE1, 'utf-8', 'hex');

let testphone2 = cipher.update(process.env.TESTPHONE2, 'utf-8', 'hex');

let testphone3 = cipher.update(process.env.TESTPHONE3, 'utf-8', 'hex');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          name: 'John', 
          username: 'JohnDoe', 
          password: bcrypt.hashSync('test1', 16),
          phoneNumber: testphone1
        },
        {
          name: 'Jess', 
          username: 'JessDoe', 
          password: bcrypt.hashSync('test1', 16),
          phoneNumber: testphone2
        },
        {
          name: 'Rebecca', 
          username: 'tester',  
          password: bcrypt.hashSync('test1', 16),
          phoneNumber: testphone3
        }
      ]);
    });
};
