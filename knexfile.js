// Update with your config settings.
require('dotenv').config(); // for read .env files
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host : process.env.DB_HOST, //'localhost',
      user : process.env.DB_USER, // root
      password : process.env.DB_PASSWORD, // 'db-local-2k23'
      database : process.env.DB_DATABASE // 'db-node-test',
    },
    migrations: {
      directory: __dirname + '/db/schema/migrations'
    },
    seeds: {
      directory: __dirname + '/db/schema/seeds'
    }
  },


  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
