const nodemailer = require("nodemailer");

let mailer = null;
let config = null;

function setup(mailConfig) {
  config = mailConfig;
  mailer = nodemailer.createTransport(mailConfig);
}

async function send(subject = "", html = "", text = "", recipients = []) {
  for (recipient of recipients) {
    try {
      await mailer.sendMail({
        from: config.from,
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
