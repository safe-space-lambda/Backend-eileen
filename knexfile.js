// Update with your config settings.
require('dotenv').config()

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/safeSpace.sqlite3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: './data/safeSpace.sqlite3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
};
