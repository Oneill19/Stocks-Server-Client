const Cat = require('../models/cat');
const viewFolder = require('../views/path').viewFolder;
const path = require('path');

// get cats html page
exports.getCatPage = async function (req, res, next) {
  res.sendFile(path.join(viewFolder + '/cat.html'));
}

// get all cats
exports.getCats = async function (req, res, next) {
  try {
    const cats = await Cat.find();
    return res.send({ cats });
  } catch (err) {
    next(err);
  }
}

// create new cat
exports.createCat = async function (req, res, next) {
  try {
    const cat = new Cat(req.body);
    const newCat = await cat.save();
    return res.status(201).send({ newCat });
  } catch (err) {
    next(err);
  }
}

// update cat
exports.updateCat = async function (req, res, next) {
  try {
    if (req.body.name !== null) {
      res.cat.name = req.body.name;
    }
    if (req.body.age !== null) {
      res.cat.age = req.body.age;
    }
    if (req.body.statud !== null) {
      res.cat.status = req.body.status;
    }

    const updatedCat = await res.cat.save();
    return res.send(updatedCat);
  } catch (err) {
    next(err);
  }
}

// delete cat
exports.deleteCat = async function (req, res, next) {
  try {
    const deletedCat = await res.cat.remove();
    return res.send({ deletedCat });
  } catch (err) {
    next(err);
  }
}

// get cat by id
exports.getCat = async function (req, res, next) {
  try {
    // get the cat data from the database
    const catData = await Cat.findById(req.params.id);

    // if the cat does not exist
    if (catData == null) {
      let err = new Error('Not Found');
      err.statusCode = 404;
      next(err);
    }

    res.cat = catData;
    next();
  } catch (err) {
    next(err);
  }
}