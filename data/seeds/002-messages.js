
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('messages')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('messages').insert([
        {text: `I'm sweet!`, user_id: 1},
        {text: `I'm cool!`, user_id: 1},
        {text: `Persevere! You know more than you think you know! You've come far in these past two weeks!`, user_id: 2},
        {text: `Awesome!`, user_id: 3}
      ]);
    });
};
