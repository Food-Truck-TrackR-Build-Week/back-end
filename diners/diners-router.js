const router = require('express').Router();

const restricted = require('../auth/restricted-middleware');
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

/* ----- GET /api/diners/:id/favoriteTrucks ----- */
router.get('/:id/favoriteTrucks', restricted, (req, res) => {
  const { id } = req.params;

  Diners.findFavoriteTrucks(id)
    .then((favorites) => {
      res.status(200).json(favorites);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
