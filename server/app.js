const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
require('dotenv').config({ path: './.env'})
require('./config/passport.config')

const app = express();

const corsOptions = {
  // origin: /* ["\\.com\\.com(\\:(\\d{2}|\\d{4}))?$", */ 'http://localhost:3000/auth'/* ] */,
  // credentials: true,
  // maxAge: 600,
  // preflightContinue: false,
};

var allowedOrigins = ['http://localhost:3000',
                      'http://localhost:8080',
                      'http://google.com',
                    ];
app.use(cors({
  origin: function(origin, callback){
    return callback(null, true)
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// app.options('*', () => {

// })

// app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

require('./db/setup')

app.use('/', require('./routes/index'));

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
