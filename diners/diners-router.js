const router = require('express').Router();

const restricted = require('../auth/restricted-middleware');
const checkDinerId = require('./checkDinerId-middleware');
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

/* ----- GET /api/diners/:id ----- */
router.get('/:id', (req, res) => {
  const { id } = req.params;

  Diners.findById(id)
    .then(async (diner) => {
      diner.favoriteTrucks = await Diners.findFavoriteTrucks(id);
      res.status(200).json(diner);
    })
    .catch((err) => {
      res.send(err);
    });
});

/* ----- GET /api/diners/:id/favoriteTrucks ----- */
router.get('/:id/favoriteTrucks', restricted, checkDinerId, (req, res) => {
  const { id } = req.params;

  Diners.findFavoriteTrucks(id)
    .then((favorites) => {
      res.status(200).json(favorites);
    })
    .catch((err) => {
      res.send(err);
    });
});

/* ----- POST /api/diners/:id/favoriteTrucks ----- */
router.post('/:id/favoriteTrucks', restricted, checkDinerId, (req, res) => {
  const dinerId = req.params.id;
  const truckId = req.body.truckId;

  if (!truckId) res.status(400).json({ message: 'truckId is required' });

  Diners.addTruckToFavs(dinerId, truckId)
    .then((favorites) => {
      res.status(201).json(favorites);
    })
    .catch((err) => {
      res.send(err);
    });
});

/* ----- DELETE /api/diners/:id/favoriteTrucks ----- */
router.delete('/:id/favoriteTrucks', restricted, (req, res) => {
  const dinerId = req.params.id;
  const truckId = req.body.truckId;

  if (!truckId) res.status(400).json({ message: 'truckId is required' });

  Diners.removeTruckFromFavs(dinerId, truckId)
    .then((favorites) => {
      res.json(favorites);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
