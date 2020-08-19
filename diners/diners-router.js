const router = require('express').Router();

const Diners = require('./diners-model');

/* ----- GET /api/diners ----- */
router.get('/', (req, res) => {
  Diners.find()
    .then((diners) => {
      res.status(200).json(diners);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
