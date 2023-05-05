// let moment = require('moment');
// moment.updateLocale(moment.locale(), { invalidDate: null })
const connConfig = {
    host : process.env.MYSQL_HOST, //'localhost',
    port : process.env.MYSQL_PORT || 3306, //'3306',
    user : process.env.MYSQL_USER || 'root', // root
    password : process.env.MYSQL_PASSWORD, // 'db-local-2k23'
    database : process.env.MYSQL_DBNAME // 'db-node-test',
}

const db = require('knex')({
    client: 'mysql2', // for mysql 8.0 should use mysql2
    connection: connConfig,
});

db.raw('SELECT 1')
    .then(() => {
        console.log('Connection to database successful');
    })
    .catch((error) => {
        console.error('Error connecting to database:', error);
    });


module.exports = { db };
