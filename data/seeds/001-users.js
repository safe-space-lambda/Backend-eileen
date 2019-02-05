
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {name: 'John', username: 'JohnDoe', password:'test1'},
        {name: 'Jess', username: 'JessDoe', password: 'test2'},
        {name: 'Rebecca', username: 'tester',  password: 'test3'}
      ]);
    });
};
