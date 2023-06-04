const viewFolder = require('../views/path').viewFolder;
const path = require('path');

exports.getSignInPage = async function (req, res, next) {
  try {
    return res.sendFile(path.join(viewFolder + '/html/sign-in.html'));
  } catch (err) {
    next(err);
  }
}