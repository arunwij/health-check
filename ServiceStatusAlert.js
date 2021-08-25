const Mailer = require("./Mailer");
const config = require("./config");
const path = require("path");
const pug = require("pug");
const { serviceStatus } = require("./constants");
//
const mailConfig = {
  host: process.env.HC_SMTP_HOST,
  port: process.env.HC_SMTP_PORT,
  auth: {
    user: process.env.HC_SMTP_USERNAME,
    pass: process.env.HC_SMTP_PASSWORD,
  },
};
const mailer = new Mailer(mailConfig);
const template = pug.compileFile(
  path.resolve(__dirname, "./templates/ServiceStatus.pug")
);
function generateNotification(alert) {
  console.log(alert);
  switch (alert.status) {
    case serviceStatus.HEALTHY: {
      const subject = `Health Check - ${alert.name} is UP`;
      const text = `Health Check - ${alert.name} is UP`;
      const status = "UP";
      const html = template({
        name: alert.name,
        status,
        httpResponse: alert.httpResponse,
        url: alert.url,
        timestamp: alert.monitoredAt,
      });

      return {
        subject,
        text,
        html,
      };
    }

    case serviceStatus.UNHEALTHY: {
      const subject = `Health Check - ${alert.name} is DOWN`;
      const text = `Health Check - ${alert.name} is DOWN`;
      const status = "DOWN";
      const html = template({
        name: alert.name,
        status,
        httpResponse: alert.httpResponse,
        url: alert.url,
        timestamp: alert.monitoredAt,
      });

      return {
        subject,
        text,
        html,
      };
    }

    default:
    // do nothing
  }
}

function ServiceStatusAlert(alert, recipients = [], mailer) {
  this.alert = alert;
  this.recipients = recipients;
  this.mailer = mailer;
}

ServiceStatusAlert.prototype.notify = async function () {
  const notification = generateNotification(this.alert);
  await this.mailer.send(
    notification.subject,
    notification.html,
    notification.text,
    this.recipients
  );
  console.log("Alert sent");
};

module.exports = ServiceStatusAlert;
