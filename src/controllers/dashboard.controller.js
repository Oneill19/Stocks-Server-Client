const viewFolder = require('../views/path').viewFolder;
const path = require('path');
const { isAuthenticated } = require('./sign-in.controller');

exports.getDashboardPage = async function (req, res, next) {
  try {
    return res.sendFile(path.join(viewFolder + '/html/dashboard.html'));
  } catch (err) {
    next(err);
  }
}