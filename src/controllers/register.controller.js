const viewFolder = require('../views/path').viewFolder;
const path = require('path');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const nodemailer = require('nodemailer');
require('dotenv').config()

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;

exports.getRegisterPage = async function (req, res, next) {
  try {
    return res.sendFile(path.join(viewFolder + '/html/register.html'));
  } catch (err) {
    next(err);
  }
}

exports.register = async function (req, res, next) {
  try{
    const {firstName, lastName, email, password} = req.body;
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  
    let mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject: 'Registration Successful',
      text: `Dear ${firstName} ${lastName}, welcome to our application!`,
    };
  
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    await User.create({ firstName, lastName, email: email.toLowerCase(), password: hashedPassword });
    return res.send({ response: 'OK' , email: email.toLowerCase(), firstName, lastName});
  }catch(err){
    next(err);
  }




}