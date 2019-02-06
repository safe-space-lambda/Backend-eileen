const bcrypt = require('bcryptjs');

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
          phoneNumber: bcrypt.hashSync('18008888888', 16)
        },
        {
          name: 'Jess', 
          username: 'JessDoe', 
          password: bcrypt.hashSync('test1', 16),
          phoneNumber: bcrypt.hashSync('15185550181', 16)
        },
        {
          name: 'Rebecca', 
          username: 'tester',  
          password: bcrypt.hashSync('test1', 16),
          phoneNumber: bcrypt.hashSync('15185550195', 16)
        }
      ]);
    });
};
