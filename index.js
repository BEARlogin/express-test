const express = require('express');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const dev = require('./dev');
const path = require('path');
const fs = require('fs');
const util = require('util');

// create express app
const app = express();
const port = 3000;

// configure express app to use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// define a route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const promisify = (fn) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn(...args, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };

};


const asyncUtil = fn =>
  function asyncUtilWrap(...args) {
    const fnReturn = fn(...args);
    const next = args[args.length-1];
    return Promise.resolve(fnReturn).catch((err) => next(err));
  };


app.get('/file', asyncUtil(async (req,res, next) => {
  const result = await promisify(fs.readFile)(path.resolve(__dirname, './test3.txt'), 'utf8');
  res.send(result);
}));

// add users route
app.use('/users', users);

// start express server
const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// stop express server
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.close();
});

// dev mode setup
if (process.env.NODE_ENV === 'development') {
  dev();
}
