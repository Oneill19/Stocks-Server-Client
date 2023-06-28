const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');

/**
 * @route /dashboard
 * @method GET
 * @description get the dashboard html page
 */
router.get('/', dashboardController.getDashboardPage);

/**
 * @route /dashboard/favorites
 * @method GET
 * @description get the favorites object array
 */
router.get('/favorites', dashboardController.getSymbolsData);

/**
 * @route /dashboard/day/:symbol
 * @method GET
 * @description get info about a symbol of the day
 */
router.get('/day/:symbol', dashboardController.getDaySymbolData);

/**
 * @route /dashboard/month/:symbol
 * @method GET
 * @description get info about a symbol of the month
 */
router.get('/month/:symbol', dashboardController.getMonthSymbolData);

/**
 * @route /dashboard/year/:symbol
 * @method GET
 * @description get info about a symbol of the year
 */
router.get('/year/:symbol', dashboardController.getYearSymbolData);

/**
 * @route /dashboard/favorites/add/:token
 * @method PATCH
 * @description add a symbol to favorites
 */
router.patch('/favorites/add/:uuid', dashboardController.addToFavorites);

/**
 * @route /dashboard/favorites/remove/:token
 * @method PATCH
 * @description remove symbol from favorites
 */
router.patch('/favorites/remove/:uuid', dashboardController.removeFromFavorites);

module.exports = router;