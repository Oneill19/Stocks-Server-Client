const viewFolder = require('../views/path').viewFolder;
const path = require('path');

exports.errorHandle = function (err, req, res, next) {
  console.error(err);

  let customError = {
    statusCode: err.statusCode || 500,
    error: err.message,
  };

  res.status(customError.statusCode).send(customError);
};

exports.getErrorPage = async function (req, res, next) {
  try {
    return res.sendFile(path.join(viewFolder + '/html/error.html'));
  } catch (err) {
    next(err);
  }
}