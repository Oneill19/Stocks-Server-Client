const express = require('express');
const router = express.Router();
const signInController = require('../controllers/sign-in.controller');

/**
 * @route /sign-in
 * @method GET
 * @description get the sign-in html page
 */
router.get('/', signInController.getSignInPage);

module.exports = router;