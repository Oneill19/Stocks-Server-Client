const express = require('express');
const router = express.Router();
const errorController = require('../controllers/error.controller');

/**
 * @route /error
 * @method GET
 * @description get the error html page
 */
router.get('/', errorController.getErrorPage);

module.exports = router;