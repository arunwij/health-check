const mailer = require("./mailer");
const path = require("path");
const pug = require("pug");
const { serviceStatus } = require("./constants");
//
const template = pug.compileFile(
  path.resolve(__dirname, "./templates/ServiceStatus.pug")
);

function generateNotification(alert) {
  switch (alert.status) {
    case serviceStatus.HEALTHY: {
      const subject = `Health Check - ${alert.name} is UP`;
      const text = `Health Check - ${alert.name} is UP`;
      const status = "UP";
      const html = template({
        name: alert.name,
        status,
        serviceStatus: true,
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
        serviceStatus: false,
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

function ServiceStatusAlert(alert, recipients = []) {
  this.alert = alert;
  this.recipients = recipients;
}

ServiceStatusAlert.prototype.notify = async function () {
  const notification = generateNotification(this.alert);
  try {
    await mailer.send(
      notification.subject,
      notification.html,
      notification.text,
      this.recipients
    );
    console.log("Alert sent");
  } catch (err) {
    console.log("Failed to send the alert");
  }
};

module.exports = ServiceStatusAlert;
