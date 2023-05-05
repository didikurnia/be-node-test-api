// let moment = require('moment');
// moment.updateLocale(moment.locale(), { invalidDate: null })
const connConfig = {
    host : process.env.DB_HOST, //'localhost',
    user : process.env.DB_USER, // root
    password : process.env.DB_PASSWORD, // 'db-local-2k23'
    database : process.env.DB_DATABASE // 'db-node-test',
    // typeCast: (field, next) => {
    //     if (field.type === 'DATETIME' || field.type === 'DATE') {
    //         return moment(field.string()).format()
    //     }
    //     return next();
    // }
}

const db = require('knex')({
    client: 'mysql',
    connection: connConfig,
    // useNullAsDefault: true,
    // pool: {
    //     min: 2,
    //     max: 10,
    // }
});

db.raw('SELECT 1')
    .then(() => {
        console.log('Connection to database successful');
    })
    .catch((error) => {
        console.error('Error connecting to database:', error);
    });


module.exports = { db };
