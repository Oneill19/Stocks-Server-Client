const User = require('../models/user');

exports.signOut = async function (req, res, next) {
  try {
    const { token } = req.body;

    await User.updateOne({ token }, { $unset: { token: 1 } });

    return res.send({ response: 'OK' });
  } catch (err) {
    next(err);
  }
}