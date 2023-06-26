const express = require('express');
const router = express.Router();
const signInController = require('../controllers/sign-in.controller');

/**
 * @route /sign-in
 * @method GET
 * @description get the sign-in html page
 */
router.get('/', signInController.getSignInPage);

/**
 * @route /sign-in
 * @method POST
 * @description sign-in a user
 */
router.post('/', signInController.signIn);

/**
 * @route /sign-in/authenticate
 * @method POST
 * @description validate if user already logged
 */
router.post('/authenticate', signInController.authenticate);

module.exports = router;