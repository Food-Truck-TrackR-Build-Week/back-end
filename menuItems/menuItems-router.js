const router = require('express').Router();

const MenuItems = require('./menuItems-model');

/* ----- GET /api/menuItems ----- */
router.get('/', (req, res) => {
  MenuItems.find()
    .then((menuItems) => {
      res.status(200).json(menuItems);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;

/* ----- POST /api/menuItems ----- */
router.post('/', (req, res) => {
  const menuItem = req.body;

  MenuItems.add(menuItem)
    .then((menuItem) => {
      res.status(201).json(menuItem);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

/* ----- PUT /api/menuItem/:id ----- */
router.put('/:id', (req, res) => {
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

/* ----- DELETE /api/menuItem/:id ----- */
router.delete('/:id', (req, res) => {
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
