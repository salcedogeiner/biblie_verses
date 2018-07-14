var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var db = require('./db/conn'); // SQLite connection

var CronJob = require('cron').CronJob;  // cron routines

new CronJob('* * * * * *', function() {

  db.serialize(() => {  
    let r =  Math.floor((Math.random() * 1000) + 1);
    db.each(`SELECT * FROM bible_fts LIMIT 1 OFFSET ` + r , (err, row) => {
  
        if (err) {
          console.error(err.message);
          db.close((err) => {
            if (err) {
              console.error(err.message);
            }
            console.log('Close the database connection.');
          });
        }    
        console.log(row.verse + "\t" + row.content);       
    });
  });  

}, null, true, 'America/Bogota');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
