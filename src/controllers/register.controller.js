const viewFolder = require('../views/path').viewFolder;
const path = require('path');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;

exports.getRegisterPage = async function (req, res, next) {
  try {
    return res.sendFile(path.join(viewFolder + '/html/register.html'));
  } catch (err) {
    next(err);
  }
}

exports.signIn = async function (req, res, next) {
  try{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    await User.create({ firstName, lastName, email: email.toLowerCase(), password: hashedPassword });
    return res.send({ response: 'OK' });
  }catch(err){
    next(err);
  }




}