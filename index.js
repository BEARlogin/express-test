const express = require('express');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const dev = require('./dev');

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
