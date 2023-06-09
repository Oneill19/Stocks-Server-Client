const viewFolder = require('../views/path').viewFolder;
const path = require('path');

exports.getRegisterPage = async function (req, res, next) {
  try {
    return res.sendFile(path.join(viewFolder + '/html/register.html'));
  } catch (err) {
    next(err);
  }
}