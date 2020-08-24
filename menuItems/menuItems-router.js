const router = require('express').Router();
const restricted = require('../auth/restricted-middleware');

const MenuItems = require('./menuItems-model');

/* ----- GET /api/menuItems ----- */
router.get('/', restricted, (req, res) => {
  MenuItems.find()
    .then((menuItems) => {
      res.status(200).json(menuItems);
    })
    .catch((err) => {
      res.send(err);
    });
});

/* ----- GET /api/menuItems/:id ----- */
router.get('/:id', restricted, (req, res) => {
  MenuItems.findById(req.params.id)
    .then((menuItem) => {
      res.status(200).json(menuItem);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to get menuItem' });
    });
});

/* ----- POST /api/menuItems ----- */
router.post('/', restricted, (req, res) => {
  const menuItem = req.body;

  MenuItems.add(menuItem)
    .then((menuItem) => {
      res.status(201).json(menuItem);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

/* ----- PUT /api/menuItems/:id ----- */
router.put('/:id', restricted, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  MenuItems.findById(id)
    .then((menuItem) => {
      if (menuItem) {
        MenuItems.update(changes, id).then((updatedMenuItem) => {
          res.json(updatedMenuItem);
        });
      } else {
        res
          .status(404)
          .json({ message: 'Could not find menuItem with the given id' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to update menuItem' });
    });
});

/* ----- DELETE /api/menuItems/:id ----- */
router.delete('/:id', restricted, (req, res) => {
  const { id } = req.params;

  MenuItems.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res
          .status(404)
          .json({ message: 'Could not find menuItem with the given id' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to delete menuItem' });
    });
});

module.exports = router;
