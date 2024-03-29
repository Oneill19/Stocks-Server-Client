const path = require('path');
const { v4: uuid } = require('uuid');
const bcrpyt = require('bcrypt');

const viewFolder = require('../views/path').viewFolder;
const User = require('../models/user');

exports.getSignInPage = async function (req, res, next) {
  try {
    return res.sendFile(path.join(viewFolder + '/html/sign-in.html'));
  } catch (err) {
    next(err);
  }
}

exports.signIn = async function (req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      throw new Error('Email or Password does not match');
    }

    const passwordMatch = await bcrpyt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Email or Password does not match');
    }

    const token = uuid();

    const loggedUser = await User.findOneAndUpdate({ email }, { token }, { new: true });

    return res.send({ token: loggedUser.token, favorites: loggedUser.favorites });
  } catch (err) {
    next(err);
  }
}

exports.authenticate = async function (req, res, next) {
  try {
    const { uuid } = req.body;

    const user = await isAuthenticated(uuid);

    if (!user) {
      return res.send({ response: 'FAILED' });
    }

    return res.send({ response: 'OK', email: user.email, favorites: user.favorites });
  } catch (err) {
    next(err);
  }
}

async function isAuthenticated(uuid) {
  const user = await User.findOne({ token: uuid });

  if (!user) {
    throw new Error('Not Authenticated');
  }

  return user;
}