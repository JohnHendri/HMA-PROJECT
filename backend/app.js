require('./config/config');
require('./config/db');

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const patRoutes = require('./routes/patrol.routes');

//middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

//route handler
app.use('/patrol', patRoutes);

// error handling
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.use((error, req, res, next) => {
  if (error.name === 'ValidationError') {
    let valErrors = [];
    Object.keys(error.errors).forEach((key) =>
      valErrors.push(error.errors[key].message)
    );
    res.status(422).send(valErrors);
  }
});

module.exports = app;
