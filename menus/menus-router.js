const router = require('express').Router();

const restricted = require('../auth/restricted-middleware');

const Menus = require('./menus-model');
const MenuItems = require('../menuItems/menuItems-model');
const ItemPhotos = require('../itemPhotos/itemPhotos-model');
