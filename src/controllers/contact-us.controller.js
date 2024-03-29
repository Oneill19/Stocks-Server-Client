const viewFolder = require('../views/path').viewFolder;
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config()

exports.getContactUsPage = async function (req, res, next) {
  try {
    return res.sendFile(path.join(viewFolder + '/html/contact-us.html'));
  } catch (err) {
    next(err);
  }
}

exports.postSubmitPage = async function (req, res, next) {
  try{
    const {name, email, dropdown, message} = req.body;

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
      subject: 'Stock Server Managers',
      text: `Dear ${name}, Thank you for contacting us!
      drop down choose: ${dropdown}
      We will get back to you as soon as possible.
      
      your message: ${message}`,
    };

        transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    // return res ok
    return res.status(200).json({message: 'Message sent successfully'});

  }catch(err){
    next(err);
  }
}