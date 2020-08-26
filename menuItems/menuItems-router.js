const router = require('express').Router();
const restricted = require('../auth/restricted-middleware');

const MenuItems = require('./menuItems-model');
const MenuItemRatings = require('../menuItemRatings/menuItemRatings-model');

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
// for TESTING purposes only
router.delete('/:id', restricted, async (req, res) => {
  const { id } = req.params;
  const { menuId } = await MenuItems.findById(id);

  MenuItems.remove(id, menuId)
    .then((deleted) => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({
          message: 'Could not find menuItem with the given id / menuId'
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to delete menuItem' });
    });
});

/* ----- POST /api/menuItems/:id/customerRatings/:dinerId ----- */
router.post('/:menuItemId/customerRatings/:dinerId', restricted, (req, res) => {
  const newRating = req.body;
  newRating.menuItemId = req.params.menuItemId;
  newRating.dinerId = req.params.dinerId;

  MenuItemRatings.add(newRating)
    .then((menuItemRating) => {
      res.status(201).json(menuItemRating);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

/* ----- DELETE /api/menuItems/:menuItemId/customerRatings/:ratingId -----*/
router.delete('/:menuItemId/customerRatings/:ratingId', (req, res) => {
  const { menuItemId, ratingId } = req.params;

  MenuItemRatings.remove(ratingId, menuItemId)
    .then((deleted) => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({
          message:
            'Could not find customerRating with the given ratingId / menuItemId'
        });
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
