const express = require('express');

const router = express.Router();
const fs = require('fs');

let count = 0;
const users = [];

// middleware
function counter(req, res, next) {
  count += 1;
  req.count = count;
  next();
}

// guard middleware
function keyGuard(req, res, next) {
  if (req.query.key === '1234') {
    next();
  } else {
    res.status(401).send('invalid key');
  }
}

// auth middleware
function authGuard(req, res, next) {
  const user = users.some((u) => u.name === req.query.user && u.password === req.query.password);
  if (user) {
    next();
    req.user = user;
  } else {
    res.status(401).send('invalid user');
  }
}

// routes
router.get('/', [keyGuard, authGuard, counter], (req, res) => {
  setTimeout(() => {
    res.json(users);
  }, 2000);
});


router.get('/count', counter, (req, res) => {   
  res.send(`Count =  ${req.count}`);
});

router.get('/:id', (req, res) => {
  res.send(`user ${req.params.id}`);
});

router.post('/', (req, res) => {
  res.send('create user');
  users.push({
    name: req.body.name,
    password: req.body.password,
  });

  console.log({
    name: req.body.name,
    password: req.body.password,
  });
});

module.exports = router;
