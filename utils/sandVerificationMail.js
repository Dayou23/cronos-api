const { createMailTransporter } = require("./createMailTransporter");
const sandVerificationMail = (user) => {
  const transporter = createMailTransporter();
  const mailOptions = {
    from: '"Taacland"<taacland63@outlook.com>',
    to: user.email,
    subject: "verify your email...",
    html: `<p>hello ${user.username}, verify your email clicking this link ...</p>
        <a href='${process.env.CLIENTURL}/verifyemail?emailToken=${user.emailToken}'>Verify Your Email</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Verification email sant");
    }
  });
};

module.exports = { sandVerificationMail };
