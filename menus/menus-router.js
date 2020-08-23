const router = require('express').Router();

const restricted = require('../auth/restricted-middleware');

const Menus = require('./menus-model');
const MenuItems = require('../menuItems/menuItems-model');

/* ----- GET /api/menus/:id ----- */
router.get('/:id', (req, res) => {
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
router.post('/:id', (req, res) => {
  let menuItem = req.body;
  menuItem.menuId = req.params.id;

  MenuItems.add(menuItem)
    .then((menuItem) => {
      res.status(201).json(menuItem);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

/* ----- PUT /api/menus/:menuId/menuItems/:menuItemId ----- */
router.put('/:menuId/menuItems/:menuItemId', (req, res) => {
  const { menuId, menuItemId } = req.params;
  const changes = req.body;

  MenuItems.findById(menuItemId)
    .then((menuItem) => {
      if (menuItem) {
        MenuItems.update(changes, menuItemId).then((updatedMenuItem) => {
          res.json(updatedMenuItem);
        });
      } else {
        res
          .status(404)
          .json({ message: 'Could not find menu itme with the given id' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to update menuItem ' });
    });
});

/* ----- DELETE /api/menus/:menuId/menuItems/:menuItemId ----- */
router.delete('/:menuId/menuItems/:menuItemId', (req, res) => {
  const { menuId, menuItemId } = req.params;

  MenuItems.remove(menuItemId)
    .then(async (deleted) => {
      if (deleted) {
        const menu = await Menus.findById(menuId);
        res.json(menu);
      } else {
        res
          .status(404)
          .json({ message: 'Could not find menuItem with given id' });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Failed to delete menuItem'
      });
    });
});

module.exports = router;
