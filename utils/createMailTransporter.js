const nodemailer = require("nodemailer");

const createMailTransporter = () => {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "taacland63@outlook.com",
      pass: process.env.Email_pass,
    },
  });
  return transporter;
};

module.exports = { createMailTransporter };
