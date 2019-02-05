
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('messages')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('messages').insert([
        {text: `I'm sweet!`, user_id: 1},
        {text: `I'm cool!`, user_id: 1},
        {text: `Totally Rad!`, user_id: 2},
        {text: `Awesome!`, user_id: 3}
      ]);
    });
};
