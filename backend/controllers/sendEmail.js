const dotenv = require('dotenv');
const Mailgen = require('mailgen')

dotenv.config();

"use strict";
const nodemailer = require("nodemailer");

async function sendEmail2() {
    const testAccount = await nodemailer.createTestAccount()
    // console.log(testAccount);

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'goldenderrick95@gmail.com', // sender address
      to: "derricknyarangi22@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    }).then((res) => 
    console.log(res.messageId, nodemailer.getTestMessageUrl(res)));
    
    // console.log("Message sent: %s", info.messageId);
}

async function sendEmail3(){
  let config ={
    service: "gmail",
    auth: {
      user: "derricknyarangi22@gmail.com",
      pass: "almr ggxl eico ogpu",
    }
  }
  const transporter =  nodemailer.createTransport(config)

  let MailGeneration = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/"
    }
  })
  let response = {
    body: {
      name:"Karibu Chakula",
      intro:"Your bill has arrived!",
      table: {
        data :[
          {
            item: "Nodemailer Stack Book",
            description: "A Backend application",
            price: "$10.99",
          }
        ]
      },
      outro: "Looking forward to do more business"
    }
  }

  let mail = MailGeneration.generate(response);

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'goldenderrick95@gmail.com', // sender address
    to: "derricknyarangi22@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    html: mail, // html body
  }).then((res) => 
  console.log(res.messageId, nodemailer.getTestMessageUrl(res)));
  

}

/** send mail from real gmail account */
const sendEmail = () => {

  // const { userEmail } = req.body;

  let config = {
      service : 'gmail',
      auth : {
          user: "derricknyarangi@gmail.com",
          pass: "pcdt gsua dznl jekv"
      }
  }

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
      theme: "default",
      product : {
          name: "Mailgen",
          link : 'https://mailgen.js/'
      }
  })

  let response = {
      body: {
          name : "Daily Tuition",
          intro: "Your bill has arrived!",
          table : {
              data : [
                  {
                      item : "Nodemailer Stack Book",
                      description: "A Backend application",
                      price : "$10.99",
                  }
              ]
          },
          outro: "Looking forward to do more business"
      }
  }

  let mail = MailGenerator.generate(response)

  let message = {
      from : "derricknyarangi@gmail.com",
      to : "goldenderrick95@gmail.com",
      subject: "Place Order",
      html: mail
  }

  transporter.sendMail(message).then((res) => {
    console.log("res", res)
      // return res.status(201).json({
      //     msg: "you should receive an email"
      // })
  })
  .catch(error => {
    console.log("error", error);
      // return res.status(500).json({ error })
  })

  // res.status(201).json("getBill Successfully...!");
}
module.exports = {sendEmail};
