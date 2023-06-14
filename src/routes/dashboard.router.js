const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');

/**
 * @route /dashboard
 * @method GET
 * @description get the dashboard html page
 */
router.get('/', dashboardController.getDashboardPage);

module.exports = router;