const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');

const adminEmail = process.env.EMAIL_CONFIG;
const adminPassword = process.env.PASSWORD_CONFIG;
const mailHost = process.env.EMAIL_HOST_CONFIG;
const mailPort = process.env.EMAIL_PORT_CONFIG;

const mailCtrl = {
  send: (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const firstError = errors.array().map((error) => error.msg)[0];
        return res.status(422).json({
          message: firstError,
        });
      } else {
        const transporter = nodemailer.createTransport({
          host: mailHost,
          port: mailPort,
          secure: false,
          auth: {
            user: adminEmail,
            pass: adminPassword,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        let mainOptions = {
          from: 'Nike shop',
          to: req.body.email,
          subject: 'Welcome to Nike shop',
          text: 'Thanks for subcribing our shop.',
          //   html: content,
        };

        transporter.sendMail(mainOptions, function (err, info) {
          if (err) {
            return res.status(500).json({
              success: false,
              message: err.message,
            });
          } else {
            return res.json({
              success: true,
              message: 'Send email successfully!',
              info: info.response,
            });
          }
        });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = mailCtrl;
