const router = require('express').Router();

const restricted = require('../auth/restricted-middleware');

const Menus = require('./menus-model');

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

/* ----- POST /api/menus/:id ----- */
router.post('/:id', restricted, (req, res) => {
  const menuId = req.params.id;
  const { menuItemId } = req.body;

  if (!menuItemId) res.status(400).json({ message: 'menuItemId is required' });

  Menus.addMenuItem(menuId, menuItemId)
    .then((menu) => {
      res.status(201).json(menu);
    })
    .catch((err) => {
      res.send(err);
    });
});

/* ----- DELETE /api/menus/:id ----- */
router.delete('/:id', restricted, (req, res) => {
  const menuId = req.params.id;
  const { menuItemId } = req.body;

  if (!menuItemId) res.status(400).json({ message: 'menuItemId is required' });

  Menus.removeMenuItem(menuId, menuItemId)
    .then((menu) => {
      res.json(menu);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
