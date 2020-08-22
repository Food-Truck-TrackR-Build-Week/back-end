const router = require('express').Router();

const restricted = require('../auth/restricted-middleware');

const Menus = require('./menus-model');
const Trucks = require('../trucks/trucks-model');

/* ----- GET /api/menus/:id ----- */
router.get('/:id', restricted, (req, res) => {
  const { id } = req.params;

  Menus.findById(id)
    .then((menu) => {
      if (menu) {
        res.status(200).json(menu);
      } else {
        res.status(404).json({ message: 'Could not find menu with given id' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to get menu' });
    });
});

module.exports = router;
