// Database Connection
require('./db');
require('module-alias/register');
//
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
// API
const apiV1Router = require('./routes/api/v1');

const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/connect-db-mysql', (req, res) => {
  const mysql = require('mysql')
  const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'db-local-2k23',
    database: 'db-node-test'
  })

  connection.connect()

  connection.query('SELECT 1 + 1', (err, rows, fields) => {
    if (err) throw err

    console.log('The solution is: ', rows)
  })

  connection.end()
  res.send('Connect to db')
});

app.get('/connect-db-knex', (req, res) => {
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
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10,
    }
  });

  db.raw("SELECT 1 + 1").then(() => {
    console.log("connected to db");
  })
      .catch((e) => {
        console.log("db failed to connect or something happen, please check ur db.");
        console.error(e);
      });
  res.send('Connect to db')
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// API Version
app.use('/api/v1', apiV1Router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
