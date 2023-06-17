const express = require('express');
const router = express.Router();
const registerController = require('../controllers/register.controller');

/**
 * @route /register
 * @method GET
 * @description get the register html page
 */
router.get('/', registerController.getRegisterPage);

/**
 * @route /sign-in
 * @method POST
 * @description sign-in a user
 */
router.post('/', registerController.signIn);

module.exports = router;