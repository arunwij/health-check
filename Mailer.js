const nodemailer = require("nodemailer");

let mailer = null;

function setup(config) {
  mailer = nodemailer.createTransport(config);
}

async function send(subject = "", html = "", text = "", recipients = []) {
  for (recipient of recipients) {
    try {
      await mailer.sendMail({
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
}

module.exports = {
  setup,
  send,
};
