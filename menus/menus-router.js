const router = require('express').Router();

const restricted = require('../auth/restricted-middleware');

const Menus = require('./menus-model');
const MenuItems = require('../menuItems/menuItems-model');
const ItemPhotos = require('../itemPhotos/itemPhotos-model');

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
router.put('/:menuId/menuItems/:menuItemId', restricted, (req, res) => {
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
router.delete('/:menuId/menuItems/:menuItemId', restricted, (req, res) => {
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

/* ----- POST /api/menus/:menuId/menuItems/:menuItemId/itemPhotos ----- */
router.post(
  '/:menuId/menuItems/:menuItemId/itemPhotos',
  restricted,
  (req, res) => {
    const { menuId, menuItemId } = req.params;
    const { url } = req.body;

    ItemPhotos.add(menuItemId, url)
      .then((itemPhotos) => {
        res.status(201).json(itemPhotos);
      })
      .catch((err) => {
        res.send(err);
      });
  }
);

/* ----- DELETE /api/menus/:menuId/menuItems/:menuItemId/itemPhotos ----- */
router.delete('/:menuId/menuItems/:menuItemId/itemPhotos', (req, res) => {
  const { menuId, menuItemId } = req.params;
  const { url } = req.body;

  ItemPhotos.remove(menuItemId, url)
    .then((itemPhotos) => {
      res.json(itemPhotos);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
