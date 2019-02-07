require('dotenv').config();
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const cipher1 =  crypto.createCipher(process.env.ALGO, Buffer.alloc(32), Buffer.alloc(16));
const cipher2 =  crypto.createCipher(process.env.ALGO, Buffer.alloc(32), Buffer.alloc(16));
const cipher3 =  crypto.createCipher(process.env.ALGO, Buffer.alloc(32), Buffer.alloc(16));

let testphone1 = cipher1.update(process.env.TESTPHONE1, 'utf8', 'hex');
testphone1 += cipher1.final('hex');
let testphone2 = cipher2.update(process.env.TESTPHONE2, 'utf8', 'hex');
testphone2 += cipher2.final('hex');
let testphone3 = cipher3.update(process.env.TESTPHONE3, 'utf8', 'hex');
testphone3 += cipher3.final('hex');

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
