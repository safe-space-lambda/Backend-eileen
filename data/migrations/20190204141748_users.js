
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
      table.increments();
      table
        .string('username', 128)
        .notNullable()
        .unique('uq_users_username');
      table
        .string('name', 128)
        .notNullable();
      table
        .string('password', 255)
        .notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
