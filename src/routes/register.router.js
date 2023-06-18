const express = require('express');
const router = express.Router();
const registerController = require('../controllers/register.controller');
const signInController = require('../controllers/sign-in.controller');
const { signIn } = require('../controllers/sign-in.controller');
const viewFolder = require('../views/path').viewFolder;

/**
 * @route /register
 * @method GET
 * @description get the register html page
 */
router.get('/', registerController.getRegisterPage);

/**
 * @route /register
 * @method POST
 * @description register a user
 */
router.post('/', registerController.register);

module.exports = router;