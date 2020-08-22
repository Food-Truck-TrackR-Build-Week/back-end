const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets');
const router = require('express').Router();

const Users = require('../users/users-model');
const Diners = require('../diners/diners-model');
const Operators = require('../operators/operators-model');

const {
  validLogin,
  validDiner,
  validOperator
} = require('../users/users-service');

/* ----- POST /api/auth/register/diner ----- */
router.post('/register/diner', (req, res) => {
  const newDiner = req.body;
  newDiner.type = 'diner';

  if (validDiner(newDiner)) {
    Users.findBy({ username: newDiner.username })
      .first()
      .then((found) => {
        if (found) {
          return res.status(400).json({ message: 'Username already exists' });
        }
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message });
      });

    const rounds = process.env.BCRYPT_ROUNDS || 8;

    const hash = bcrypt.hashSync(newDiner.password, rounds);

    newDiner.password = hash;

    Users.add(newDiner, 'diner')
      .then((id) => {
        Diners.findByUserId(id)
          .then((diner) => {
            diner.favoriteTrucks = [];
            return res.status(201).json(diner);
          })
          .catch((err) => {
            res.status(500).json({ message: err.message });
          });
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message });
      });
  } else {
    return res.status(400).json({
      message:
        'Username, password, email, and location are required to create a new diner'
    });
  }
});

/* ----- POST /api/auth/register/operator ----- */
router.post('/register/operator', (req, res) => {
  const newOperator = req.body;
  newOperator.type = 'operator';

  if (validOperator(newOperator)) {
    Users.findBy({ username: newOperator.username })
      .first()
      .then((found) => {
        if (found) {
          return res.status(400).json({ message: 'Username already exists' });
        }
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message });
      });

    const rounds = process.env.BCRYPT_ROUNDS || 8;

    const hash = bcrypt.hashSync(newOperator.password, rounds);

    newOperator.password = hash;

    Users.add(newOperator, 'operator')
      .then((id) => {
        Operators.findByUserId(id)
          .then((operator) => {
            operator.trucksOwned = [];
            return res.status(201).json(operator);
          })
          .catch((err) => {
            res.status(500).json({ message: err.message });
          });
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message });
      });
  } else {
    return res.status(400).json({
      message:
        'Username, password, and email are required to create a new operator'
    });
  }
});

/* ----- POST /api/auth/login ----- */
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (validLogin(req.body)) {
    Users.findBy({ username }).then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ token, type: user.type });
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
