const dotenv = require('dotenv');
const Mailgen = require('mailgen')

var nodemailer = require('nodemailer');

const sendEmailCode = () =>{
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'derricknyarangi@gmail.com',
      pass: 'almr ggxl eico ogpu'
    }
  });
  
  var mailOptions = {
    from: 'derricknyarangi@gmail.com',
    to: 'goldenderrick95@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}  

module.exports = {
  sendEmailCode
};
