const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets');
const router = require('express').Router();

const Users = require('../users/users-model');
const { isValid } = require('../users/users-service');

/* ----- POST /api/auth/register/:userType ----- */
router.post('/register/:userType', (req, res) => {
  const credentials = req.body;
  const { userType } = req.params;

  if (userType !== 'diner' && userType !== 'operator') {
    return res.status(400).json({
      message: 'Invalid user type - must be either diner or operator'
    });
  }

  if (userType === 'diner' && !credentials.location) {
    return res.status(400).json({ message: 'Please provide a location' });
  }

  Users.findBy({ username: credentials.username })
    .first()
    .then((found) => {
      if (found) res.status(400).json({ message: 'Username already exists' });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });

  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;

    const hash = bcrypt.hashSync(credentials.password, rounds);

    credentials.password = hash;

    Users.add(credentials, userType)
      .then((user) => {
        res.status(201).json({ data: user });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } else {
    res.status(400).json({
      message: 'Please provide a username and alphanumeric password'
    });
  }
});

/* ----- POST /api/auth/login ----- */
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ username }).then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: 'Invalid username/password' });
      }
    });
  } else {
    res
      .status(400)
      .json({ message: 'Please provide a username and alphanumeric password' });
  }
});

const generateToken = (user) => {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: '1d'
  };

  const secret = secrets.jwtSecret;

  return jwt.sign(payload, secret, options);
};

module.exports = router;
