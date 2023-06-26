const viewFolder = require('../views/path').viewFolder;
const path = require('path');

exports.getContact_usPage = async function (req, res, next) {
  try {
    return res.sendFile(path.join(viewFolder + '/html/contact_us.html'));
  } catch (err) {
    next(err);
  }
}