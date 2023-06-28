const express = require('express');
const router = express.Router();
const contactUsController = require('../controllers/contact-us.controller');

/**
 * @route /contact-us
 * @method GET
 * @description get the contact-us html page
 */
router.get('/', contactUsController.getContactUsPage);

/**
 * @route /contact-us
 * @method POST
 * @description get the contact-us html page
 */
router.post('/', contactUsController.postSubmitPage)


module.exports = router;