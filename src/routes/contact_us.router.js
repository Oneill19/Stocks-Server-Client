const express = require('express');
const router = express.Router();
const contact_usController = require('../controllers/contact_us.controller');

/**
 * @route /contact_us
 * @method GET
 * @description get the contact_us html page
 */
router.get('/', contact_usController.getContact_usPage);

/**
 * @route /contact_us
 * @method POST
 * @description get the contact_us html page
 */
router.post('/', contact_usController.postSubmitPage)

/**
 * @route /contact_us/mailto
 * @method POST
 * @description open a mailto dialog
 */
router.post('/mailto', contact_usController.postMailTo);


module.exports = router;