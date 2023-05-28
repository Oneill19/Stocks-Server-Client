const express = require('express');
const router = express.Router();
const catController = require('../controllers/cat.controller');

/**
 * @route /cat
 * @method GET
 * @description get the cats html page
 */
router.get('/', catController.getCatPage);

/**
 * @route /cat/get-all
 * @method GET
 * @description get all cats from the database
 */
router.get('/get-all', catController.getCats);

/**
 * @route /cat/create
 * @method POST
 * @description create a new cat
 */
router.post('/create', catController.createCat);

/**
 * @route /cat/update/:
 * @method PATCH
 * @description update a cat in the database
 */
router.patch('/update/:id', catController.getCat, catController.updateCat);

/**
 * @route /cat/delete/:id
 * @method DELETE
 * @description delete a cat from the databse
 */
router.delete('/delete/:id', catController.getCat, catController.deleteCat);

/**
 * @route /cat/get/:id
 * @method GET
 * @description get one cat data from the database
 */
router.get('/get/:id', catController.getCat, (req, res) => res.send({ cat: res.cat }));

module.exports = router;