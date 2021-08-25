const nodemailer = require("nodemailer");

function Mailer(config) {
  this.transporter = nodemailer.createTransport(config);
}

Mailer.prototype.send = async function (
  subject = "",
  html = "",
  text = "",
  recipients = []
) {
  for (recipient of recipients) {
    try {
      await this.transporter.sendMail({
        from: "health-check@mailtrap.io",
        to: recipient,
        subject: subject,
        html: html,
        text: text,
      });
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = Mailer;
