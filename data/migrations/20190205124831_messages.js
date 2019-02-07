
exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', table => {
      table.increments();
      table
        .string('text', 1500)
        .notNullable();
      table
        .integer('user_id')
        .unsigned()
        .references('users.id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('messages');
};
