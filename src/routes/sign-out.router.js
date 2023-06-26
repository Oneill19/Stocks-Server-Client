const express = require('express');
const router = express.Router();
const signOutController = require('../controllers/sign-out.controller');

/**
 * @route /sign-out
 * @method POST
 * @description sign-out the user
 */
router.post('/', signOutController.signOut);

module.exports = router;