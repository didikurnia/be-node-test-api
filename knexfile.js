// Update with your config settings.
require('dotenv').config(); // for read .env files
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host : process.env.MYSQL_HOST, //'localhost',
      port : process.env.MYSQL_PORT || 3306, //'localhost',
      user : process.env.MYSQL_USER || 'root', // root
      password : process.env.MYSQL_PASSWORD, // 'db-local-2k23'
      database : process.env.MYSQL_DBNAME // 'db-node-test',
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
